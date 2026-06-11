// Mapa de apartamentos con marcadores de precio estilo Airbnb (Leaflet + OSM).
(function () {
  const el = document.getElementById("listings-map");
  const dataEl = document.getElementById("map-data");
  if (!el || !dataEl || typeof L === "undefined") return;

  const listings = JSON.parse(dataEl.textContent || "[]");
  if (!listings.length) return;

  const map = L.map(el, { scrollWheelZoom: false });
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  const bounds = [];
  for (const p of listings) {
    const icon = L.divIcon({
      className: "",
      html: `<span class="map-price-marker">${p.price ? p.price + " €" : "·"}</span>`,
      iconSize: null,
    });
    const marker = L.marker([p.lat, p.lng], { icon }).addTo(map);
    marker.bindPopup(
      `<a class="map-popup" href="${p.url}">` +
        `<img src="${p.photo}" alt="" loading="lazy">` +
        `<strong>${p.name}</strong>` +
        `<span>${p.zone}${p.price ? " · " + p.price + " €/" + p.night : ""}</span>` +
        `<em>${p.view} →</em>` +
        `</a>`,
      { minWidth: 200 }
    );
    bounds.push([p.lat, p.lng]);
  }

  map.fitBounds(bounds, { padding: [40, 40] });
})();
