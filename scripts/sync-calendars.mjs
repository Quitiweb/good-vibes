#!/usr/bin/env node
/**
 * Sincroniza la disponibilidad desde los calendarios iCal de Airbnb y Booking.
 *
 * Lee las URLs de `ical.airbnb` / `ical.booking` de cada propiedad en
 * src/_data/properties.json, descarga los .ics, extrae los rangos ocupados
 * (DTSTART/DTEND) y reescribe src/_data/availability.json.
 *
 * Las propiedades sin iCal configurado conservan los datos que ya tuvieran.
 * Sin dependencias: solo Node 18+ (fetch nativo).
 */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const propertiesPath = path.join(root, "src/_data/properties.json");
const availabilityPath = path.join(root, "src/_data/availability.json");

function parseIcsDates(ics) {
  // Eventos VEVENT con DTSTART/DTEND en formato fecha (YYYYMMDD) o fecha-hora.
  const ranges = [];
  const events = ics.split("BEGIN:VEVENT").slice(1);
  for (const ev of events) {
    const start = ev.match(/DTSTART(?:;[^:]*)?:(\d{8})/);
    const end = ev.match(/DTEND(?:;[^:]*)?:(\d{8})/);
    if (!start || !end) continue;
    const fmt = (s) => `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}`;
    ranges.push([fmt(start[1]), fmt(end[1])]);
  }
  return ranges;
}

function mergeRanges(ranges) {
  if (!ranges.length) return [];
  const sorted = [...ranges].sort((a, b) => a[0].localeCompare(b[0]));
  const merged = [sorted[0]];
  for (const [start, end] of sorted.slice(1)) {
    const last = merged[merged.length - 1];
    if (start <= last[1]) {
      if (end > last[1]) last[1] = end;
    } else {
      merged.push([start, end]);
    }
  }
  return merged;
}

const properties = JSON.parse(await readFile(propertiesPath, "utf8"));
let availability = {};
try {
  availability = JSON.parse(await readFile(availabilityPath, "utf8"));
} catch {
  /* primera ejecución */
}

let updated = 0;
for (const prop of properties) {
  const urls = Object.values(prop.ical || {}).filter(Boolean);
  if (!urls.length) {
    console.log(`· ${prop.slug}: sin iCal configurado, se mantiene como está`);
    continue;
  }
  const ranges = [];
  for (const url of urls) {
    try {
      const res = await fetch(url, { redirect: "follow" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      ranges.push(...parseIcsDates(await res.text()));
    } catch (err) {
      console.error(`✗ ${prop.slug}: error con ${url}: ${err.message}`);
    }
  }
  availability[prop.slug] = { busy: mergeRanges(ranges) };
  updated++;
  console.log(`✓ ${prop.slug}: ${availability[prop.slug].busy.length} rangos ocupados`);
}

availability._comment =
  "Generado por scripts/sync-calendars.mjs a partir de los iCal de Airbnb/Booking. Las propiedades sin iCal conservan sus datos manuales.";
await writeFile(availabilityPath, JSON.stringify(availability, null, 2) + "\n");
console.log(`\nListo: ${updated} propiedades actualizadas → ${availabilityPath}`);
