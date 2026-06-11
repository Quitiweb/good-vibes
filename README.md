# Good Vibes Apartments — web

MVP de la nueva web de [goodvibesapartments.com](https://goodvibesapartments.com):
estática, multiidioma (ES/EN/FR/IT), mobile-first y sin motor de reservas —
fotos, descripción breve, calendario de disponibilidad y enlaces a Airbnb/Booking.

**⚠️ Estado: demo.** Las 6 propiedades, fotos (Unsplash), enlaces y calendarios
son datos de ejemplo para enseñar a Pedro. Ver "Qué necesitamos de Pedro".

## Desarrollo

```bash
npm install
npm run serve    # http://localhost:8080
npm run build    # genera _site/
```

Hecho con [Eleventy 2](https://www.11ty.dev/). Sin más dependencias.

## Estructura

| Qué | Dónde |
|---|---|
| Propiedades (datos editables) | `src/_data/properties.json` |
| Disponibilidad (la regenera el sync) | `src/_data/availability.json` |
| Textos de la interfaz en 4 idiomas | `src/_data/i18n.json` |
| Contacto, dominio, ciudad | `src/_data/site.json` |
| Artículos del blog (markdown) | `src/blog/*.md` |
| Plan SEO y keywords | `docs/seo-plan.md` |

Para **añadir una propiedad**: copiar un bloque de `properties.json`, cambiar
slug, textos (4 idiomas), fotos y enlaces. Las páginas en los 4 idiomas, el
sitemap y los `hreflang` se generan solos.

## Calendarios de Airbnb y Booking

Cada propiedad tiene `ical.airbnb` / `ical.booking` en `properties.json`.
Pegando ahí las URLs de exportación iCal (Airbnb: *Calendario → Disponibilidad →
Sincronización de calendarios → Exportar*; Booking: *Tarifas y disponibilidad →
Sincronizar calendarios*), el workflow
[sync-calendars.yml](.github/workflows/sync-calendars.yml) actualiza la
disponibilidad cada 6 horas y la web se reconstruye sola. A mano:
`npm run sync:calendars`.

## Despliegue (GitHub Pages)

Cada push a `main` despliega vía [deploy.yml](.github/workflows/deploy.yml) al
subdominio **https://gvibes.quitiweb.com** (el DNS ya apunta a
`quitiweb.github.io` y el archivo `CNAME` va incluido en el build).

Pasos únicos en GitHub si aún no están hechos:

1. *Settings → Pages → Source*: **GitHub Actions**.
2. *Settings → Pages → Custom domain*: `gvibes.quitiweb.com` + *Enforce HTTPS*.

Si algún día se sirviera sin dominio propio (en
`quitiweb.github.io/good-vibes/`), crear la variable de repositorio
`PATH_PREFIX` con valor `/good-vibes/`. Si cambia el dominio, actualizar
también `url` en `src/_data/site.json`, el `Sitemap:` de `src/robots.txt`
y el archivo `CNAME`.

## Qué necesitamos de Pedro

- [ ] Lista real de propiedades: nombre, zona, m², huéspedes, camas, baños
- [ ] Fotos reales de cada piso (mín. 4 por piso, horizontales)
- [ ] Descripción breve de cada piso (se la traducimos a EN/FR/IT)
- [ ] Enlaces públicos de cada anuncio en Airbnb y Booking
- [ ] URLs iCal de exportación de cada anuncio (Airbnb y Booking)
- [ ] Teléfono/WhatsApp y email de contacto reales
- [ ] Confirmar ciudad y zonas (ahora la demo dice Málaga)
- [ ] Logo si lo tiene (si no, se queda el sol ☀️)

Cuando esté todo, poner `"demoNote": false` en `src/_data/site.json` para
quitar el aviso amarillo de demo.

## SEO (para Luke)

Plan de contenidos, keywords y calendario editorial en
[docs/seo-plan.md](docs/seo-plan.md). Investigación de keywords con la API de
SEMrush: `SEMRUSH_API_KEY=xxx npm run keywords -- "semilla 1" "semilla 2"`.
