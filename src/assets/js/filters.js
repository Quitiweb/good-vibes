// Filtros del listado de apartamentos (tipo, precio máx., dormitorios, huéspedes).
(function () {
  const form = document.querySelector("[data-filters]");
  const grid = document.querySelector("[data-property-grid]");
  if (!form || !grid) return;

  const selects = form.querySelectorAll("select[data-filter]");
  const clearBtn = form.querySelector("[data-filters-clear]");
  const noResults = document.querySelector("[data-no-results]");
  const cards = grid.querySelectorAll(".property-card");

  function apply() {
    const active = {};
    selects.forEach((s) => {
      if (s.value) active[s.dataset.filter] = s.value;
    });

    let visible = 0;
    cards.forEach((card) => {
      const okType = !active.type || card.dataset.type === active.type;
      const okPrice = !active.price || Number(card.dataset.price) <= Number(active.price);
      const okBeds = !active.bedrooms || Number(card.dataset.bedrooms) >= Number(active.bedrooms);
      const okGuests = !active.guests || Number(card.dataset.guests) >= Number(active.guests);
      const show = okType && okPrice && okBeds && okGuests;
      card.hidden = !show;
      if (show) visible++;
    });

    if (noResults) noResults.hidden = visible > 0;
    if (clearBtn) clearBtn.hidden = Object.keys(active).length === 0;
  }

  selects.forEach((s) => s.addEventListener("change", apply));
  if (clearBtn)
    clearBtn.addEventListener("click", () => {
      selects.forEach((s) => (s.value = ""));
      apply();
    });
})();
