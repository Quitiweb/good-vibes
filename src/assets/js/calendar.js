// Calendario de disponibilidad: pinta los próximos meses marcando las fechas
// ocupadas que vienen de #availability-data (rangos [entrada, salida) estilo iCal).
(function () {
  const el = document.querySelector("[data-calendar]");
  const dataEl = document.getElementById("availability-data");
  if (!el || !dataEl) return;

  const MONTHS_TO_SHOW = 3;
  const lang = document.documentElement.lang || "es";
  const ranges = JSON.parse(dataEl.textContent || "[]");

  // Siempre en fecha local: nada de toISOString(), que usa UTC y desplaza un día.
  const isoLocal = (d) =>
    d.getFullYear() +
    "-" +
    String(d.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(d.getDate()).padStart(2, "0");

  const busy = new Set();
  for (const [start, end] of ranges) {
    const d = new Date(start + "T00:00:00");
    const stop = new Date(end + "T00:00:00");
    while (d < stop) {
      busy.add(isoLocal(d));
      d.setDate(d.getDate() + 1);
    }
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayIso = isoLocal(today);

  const monthFmt = new Intl.DateTimeFormat(lang, { month: "long", year: "numeric" });
  const dowFmt = new Intl.DateTimeFormat(lang, { weekday: "narrow" });

  // Cabecera de días de la semana, empezando en lunes
  const dows = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(2026, 5, 1 + i); // 1 jun 2026 = lunes
    dows.push(dowFmt.format(d));
  }

  for (let m = 0; m < MONTHS_TO_SHOW; m++) {
    const first = new Date(today.getFullYear(), today.getMonth() + m, 1);
    const month = document.createElement("div");
    month.className = "cal-month";

    const h = document.createElement("h3");
    const label = monthFmt.format(first);
    h.textContent = label.charAt(0).toUpperCase() + label.slice(1);
    month.appendChild(h);

    const grid = document.createElement("div");
    grid.className = "cal-grid";
    for (const dow of dows) {
      const c = document.createElement("span");
      c.className = "dow";
      c.textContent = dow;
      grid.appendChild(c);
    }

    // Hueco hasta el primer día (semana empieza en lunes)
    const offset = (first.getDay() + 6) % 7;
    for (let i = 0; i < offset; i++) grid.appendChild(document.createElement("span"));

    const daysInMonth = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(first.getFullYear(), first.getMonth(), day);
      const iso =
        date.getFullYear() +
        "-" +
        String(date.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(date.getDate()).padStart(2, "0");
      const cell = document.createElement("span");
      cell.className =
        "cal-day " + (iso < todayIso ? "past" : busy.has(iso) ? "busy" : "free");
      cell.textContent = day;
      grid.appendChild(cell);
    }

    month.appendChild(grid);
    el.appendChild(month);
  }
})();
