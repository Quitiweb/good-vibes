# Plan de contenido SEO — Good Vibes Apartments

Adaptación del framework del deck de Luke ("Clip N Climb — SEO Content Deck") al
alquiler vacacional. Mismo enfoque: **contenido bottom-of-funnel**, escrito para
quien está a un paso de reservar (o de cedernos su piso), no artículos genéricos.

> ⚠️ **Pendiente de confirmar con Pedro:** la ciudad/zonas reales de las
> propiedades. Todo el plan usa Málaga como ejemplo; basta sustituir la ciudad
> y los barrios al confirmar.

## Por qué funciona este contenido

- El viajero no reserva a la primera: busca, compara zonas, lee opiniones.
  Quien aparece en cada paso de esa búsqueda gana la reserva.
- Los gestores locales de apartamentos casi nunca tienen blog. Hueco abierto.
- Hay un segundo público que vale oro: **propietarios** buscando gestor.
  Una sola conversión de propietario vale más que muchas reservas.

## Reglas de redacción (del deck de Luke, aplican igual)

- Voz de amigo local que conoce la ciudad. Cálido y real.
- Frases cortas. Voz activa. Sin jerga corporativa.
- Referencias locales concretas (barrios, tiempos andando, parking, playas).
- Sin introducciones de relleno: empezar con la respuesta.
- Sin muletillas de IA ni guiones largos.
- 850–1100 palabras, hook fuerte en el primer párrafo, subtítulos con
  beneficio, FAQ con preguntas reales y un único CTA claro al final.
- Keyword principal en H1, intro, un subtítulo y meta description; las
  secundarias integradas con naturalidad.

## Los dos embudos

### Embudo A — Viajeros (inquilinos)

| # | Pieza | Tipo | Intención | Keywords objetivo (ejemplo Málaga) |
|---|---|---|---|---|
| A1 | Mejores zonas donde alojarse en Málaga: guía honesta barrio a barrio | Top list local | Comparación | dónde alojarse en málaga, mejores zonas málaga, dormir en málaga |
| A2 | ¿Airbnb o Booking? Dónde te conviene reservar | Comparativa | Bottom funnel / VS | airbnb o booking, diferencias airbnb booking ✅ *publicado* |
| A3 | Qué mirar antes de reservar un apartamento turístico: checklist de 10 puntos | FAQ / Checklist | Decisión / Confianza | qué mirar antes de reservar apartamento ✅ *publicado* |
| A4 | Málaga con niños: apartamentos y planes que funcionan | Guía familiar | Reserva grupo | málaga con niños, apartamento familiar málaga |
| A5 | Una semana en Málaga sin coche: cómo moverte desde tu apartamento | Guía práctica | Eliminación de barreras | moverse por málaga, málaga sin coche |
| A6 | ¿Apartamento u hotel en Málaga? Cuándo compensa cada uno | Comparativa | Bottom funnel / VS | apartamento u hotel, apartamento vs hotel vacaciones |
| A7 | Teletrabajar desde Málaga: apartamentos preparados para ello | Nicho remoto | Estancia larga | teletrabajar desde málaga, apartamento teletrabajo |
| A8 | Calendario malagueño: cuándo reservar para Feria, Semana Santa y verano | Estacional | Planificación | feria de málaga alojamiento, semana santa málaga apartamento |

### Embudo B — Propietarios (B2B, el de mayor valor)

| # | Pieza | Tipo | Intención | Keywords objetivo |
|---|---|---|---|---|
| B1 | ¿Merece la pena el alquiler turístico? Guía honesta para propietarios | Guía B2B | Captación | merece la pena alquiler turístico ✅ *publicado* |
| B2 | Cuánto genera un apartamento turístico en Málaga (números reales) | Datos / Calculadora | Captación | rentabilidad apartamento turístico málaga |
| B3 | Licencia turística en Andalucía: pasos, plazos y errores típicos | How-to legal | Confianza / E-E-A-T | licencia turística andalucía, licencia vivienda turística málaga |
| B4 | Gestión de apartamentos turísticos: qué incluye y qué cobra un gestor | FAQ B2B | Bottom funnel | gestión apartamentos turísticos, empresa gestión airbnb |
| B5 | Alquiler turístico vs. larga temporada: comparativa sin humo | Comparativa | Bottom funnel / VS | alquiler turístico o larga temporada |
| B6 | Cómo preparar tu piso para alquiler turístico: inversión mínima y deseable | How-to | Eliminación de barreras | preparar piso alquiler turístico, amueblar apartamento turístico |
| B7 | Por qué tu anuncio de Airbnb no recibe reservas (auditoría en 10 puntos) | Auditoría | Conversión | airbnb no recibo reservas, mejorar anuncio airbnb |
| B8 | Impuestos del alquiler turístico para propietarios: lo básico explicado | FAQ fiscal | Confianza | impuestos alquiler turístico, irpf alquiler vacacional |

## Palabras clave: siguiente paso con SEMrush

Luke quiere validar volúmenes con la API de SEMrush. Ya está preparado:

```bash
SEMRUSH_API_KEY=xxxx npm run keywords -- "apartamentos turisticos malaga" "gestion apartamentos turisticos"
```

El script (`scripts/semrush-keywords.mjs`) consulta `phrase_related` en la base
de datos española, imprime una tabla markdown y guarda
`docs/seo/keywords-semrush.csv`. Con eso se ajustan las keywords objetivo de
las tablas de arriba antes de redactar cada pieza.

Semillas sugeridas para la primera pasada (sustituir Málaga si procede):

- `apartamentos turisticos malaga` · `alquiler vacacional malaga` · `donde alojarse en malaga`
- `apartamento playa malaga` · `apartamento centro malaga`
- `gestion apartamentos turisticos` · `empresa gestion airbnb` · `rentabilidad apartamento turistico`
- `licencia turistica andalucia`

## SEO técnico ya implementado en la web

- Páginas estáticas por idioma con `hreflang` (es/en/fr/it) y canonical.
- `sitemap.xml` y `robots.txt` generados.
- Datos estructurados Schema.org (`Accommodation`) en cada ficha.
- Open Graph con foto del apartamento.
- Mobile-first, imágenes lazy-load, sin frameworks pesados.
- Blog enlazado desde el footer (petición de Luke).

## Calendario editorial propuesto

2 piezas/mes alternando embudos: mes 1 → A1 + B2 · mes 2 → A6 + B4 ·
mes 3 → A4 + B3 · y así. Las tres piezas marcadas ✅ ya están publicadas
como ejemplo de tono y formato.
