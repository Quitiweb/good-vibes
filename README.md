# Good Vibes Apartments — web

MVP de la nueva web de [goodvibesapartments.com](https://goodvibesapartments.com):
estática, multiidioma (ES/EN/FR/IT), mobile-first y sin motor de reservas —
fotos, descripción breve, calendario de disponibilidad y enlaces a Airbnb/Booking.

**Estado: en producción con datos reales.** Publica los 3 estudios reales de
Pedro (Good Vibes Estudio De Luxe Trinidad 1, 2 y 3, en Calle Trinidad 6,
Málaga) con fotos propias, enlaces a Airbnb/Booking y calendarios sincronizados
por iCal. El aviso de demo (`demoNote` en `src/_data/site.json`) está desactivado.
Faltan los apartamentos restantes de Pedro (ver "Qué necesitamos de Pedro").

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

Campos que alimentan los **filtros del listado** (tipo, precio máx., dormitorios,
huéspedes): `type` (`apartment` | `studio` | `penthouse` — etiquetas en
`i18n.json` → `types`), `priceFrom` (€/noche orientativo; si se omite no se
muestra precio), `bedrooms` y `guests`. Los campos `lat`/`lng` posicionan cada
piso en **el mapa** de la portada (Leaflet + OpenStreetMap autoalojado, con
marcadores de precio estilo Airbnb).

Estilos: `main.css` (base) + `ux-patch.css` (auditoría UX de Luke: tipografía
DM Sans/DM Serif Display, colores AA, focus visible) + `fonts.css` (fuentes
autoalojadas en `src/assets/fonts/`, sin llamadas a Google → sin líos RGPD).

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

Ya integrados: **6 apartamentos** (3 estudios de Calle Trinidad 6 + Sunny
Penthouse, Family & Friends Atarazanas y Downtown Jinetes), con datos, fotos,
enlaces Airbnb/Booking e iCal; contacto real, ciudad (Málaga) y **logo** real.

Pendiente para completar el catálogo:

- [ ] El resto de apartamentos (mismos datos: nombre, dirección, m², huéspedes,
      camas, baños, tipo, precio base, enlaces Airbnb/Booking, iCal)
- [ ] Booking de Sunny Penthouse y Family & Friends cuando los publique
- [ ] Confirmar si "Trinidad 3" debe figurar como estudio o como 1 dormitorio
- [ ] Coordenadas exactas de cada edificio para el mapa (ahora son orientativas)
- [ ] Snippet embed del chatbot noupe (ver más abajo)

### Fotos: se cogen de Airbnb
Las fotos de cada piso se descargan **una vez** desde su anuncio de Airbnb
(`scripts/fetch-airbnb-photos`, o a mano) y se guardan en
`src/assets/img/apartamentos/<slug>/01.jpg…`. Así coinciden con las del anuncio
(las que Pedro filtra antes de subirlas) y no hay que reenviarlas. Si Pedro
actualiza las fotos en Airbnb, basta volver a descargarlas.

> Nota iCal: los enlaces `admin.booking.com/...ical.html` son del panel y **no**
> son públicos (dan HTTP 400 en la sincronización). El formato correcto es
> `ical.booking.com/v1/export?t=...` (como en Downtown Jinetes). En todo caso el
> iCal de Airbnb ya cubre la disponibilidad de cada piso.

Para añadir un apartamento: nueva entrada en `src/_data/properties.json`, fotos
en `src/assets/img/apartamentos/<slug>/` y `npm run sync:calendars`.

## Logo y chatbot

- **Logo:** marca en `src/assets/img/logo-icon.svg` (cabecera + favicon) y lockup
  completo en `logo-full.svg`. Vienen de los PDF que envió Pedro
  (`LOGO GOOD VIBES OP7` y `LOGO+TEXTO OP4`).
- **Chatbot de FAQs (noupe/Jotform):** crear agente gratis en noupe.com
  apuntándolo a https://gvibes.quitiweb.com, copiar el código *embed*, pegarlo en
  `src/_includes/partials/chatbot.njk` y poner `"chatbot": true` en
  `src/_data/site.json`. Aparece en todas las páginas e idiomas.

## SEO (para Luke)

Plan de contenidos, keywords y calendario editorial en
[docs/seo-plan.md](docs/seo-plan.md). Investigación de keywords con la API de
SEMrush: `SEMRUSH_API_KEY=xxx npm run keywords -- "semilla 1" "semilla 2"`.
