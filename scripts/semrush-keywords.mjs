#!/usr/bin/env node
/**
 * Investigación de palabras clave con la API de SEMrush.
 *
 * Uso:
 *   SEMRUSH_API_KEY=xxxx node scripts/semrush-keywords.mjs "apartamentos turisticos malaga" "alquiler vacacional malaga"
 *
 * Sin argumentos usa las semillas por defecto de abajo. Imprime una tabla
 * markdown con volumen, CPC y competencia (base de datos: es) y vuelca el
 * resultado completo a docs/seo/keywords-semrush.csv.
 *
 * Nota: la API de SEMrush es de pago (unidades por línea). El informe
 * `phrase_related` consume ~40 unidades/línea. Con display_limit=30 por
 * semilla el coste es contenido.
 */
import { writeFile, mkdir } from "node:fs/promises";

const API_KEY = process.env.SEMRUSH_API_KEY;
const DATABASE = process.env.SEMRUSH_DB || "es";

const DEFAULT_SEEDS = [
  "apartamentos turisticos malaga",
  "alquiler vacacional malaga",
  "apartamento playa malagueta",
  "gestion apartamentos turisticos",
];

const seeds = process.argv.slice(2).length ? process.argv.slice(2) : DEFAULT_SEEDS;

if (!API_KEY) {
  console.error("Falta SEMRUSH_API_KEY. Pídele la clave a Luke y ejecuta:");
  console.error('  SEMRUSH_API_KEY=xxxx node scripts/semrush-keywords.mjs "semilla 1" "semilla 2"');
  process.exit(1);
}

async function phraseReport(type, phrase) {
  const url = new URL("https://api.semrush.com/");
  url.searchParams.set("type", type);
  url.searchParams.set("key", API_KEY);
  url.searchParams.set("phrase", phrase);
  url.searchParams.set("database", DATABASE);
  url.searchParams.set("export_columns", "Ph,Nq,Cp,Co,Nr");
  url.searchParams.set("display_limit", "30");
  url.searchParams.set("display_sort", "nq_desc");

  const res = await fetch(url);
  const text = await res.text();
  if (text.startsWith("ERROR")) {
    console.error(`  ⚠ ${phrase}: ${text.trim()}`);
    return [];
  }
  const [header, ...lines] = text.trim().split("\n");
  if (!lines.length) return [];
  return lines.map((line) => {
    const [keyword, volume, cpc, competition, results] = line.split(";");
    return { seed: phrase, keyword, volume: +volume, cpc, competition, results };
  });
}

const all = [];
for (const seed of seeds) {
  console.error(`Buscando relacionadas de: ${seed}`);
  all.push(...(await phraseReport("phrase_related", seed)));
}

all.sort((a, b) => b.volume - a.volume);
const unique = [...new Map(all.map((r) => [r.keyword, r])).values()];

console.log("| Palabra clave | Volumen (es) | CPC € | Competencia |");
console.log("|---|---|---|---|");
for (const r of unique.slice(0, 50)) {
  console.log(`| ${r.keyword} | ${r.volume} | ${r.cpc} | ${r.competition} |`);
}

await mkdir("docs/seo", { recursive: true });
const csv =
  "seed;keyword;volume;cpc;competition;results\n" +
  unique.map((r) => [r.seed, r.keyword, r.volume, r.cpc, r.competition, r.results].join(";")).join("\n");
await writeFile("docs/seo/keywords-semrush.csv", csv + "\n");
console.error(`\nGuardado docs/seo/keywords-semrush.csv (${unique.length} keywords)`);
