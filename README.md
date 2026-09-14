# OneClickSpain — site scaffold (v1)

Static HTML/CSS/JS scaffold for oneclickspain.com, built to deploy as-is via IONOS Deploy Now (root directory, no build step).

## What's here

- `index.html` — landing page
- `regions/index.html` — interactive map of all 17 autonomous communities
- `regions/<slug>.html` — one page per region, each with the region highlighted on the map, its capital, and its provinces listed
- `culture/`, `live/`, `news/`, `retail/`, `visit/`, `events/`, `sport/`, `communities/`, `food-drink/` — stub pages with real page structure and placeholder content, ready for content to be dropped in
- `css/style.css` — shared design system (palette, type, layout)
- `js/main.js` — mobile nav toggle + clickable region map behaviour

## Region map

The map is Spain's 17 autonomous communities as individual SVG paths, sourced from the `@svg-maps/spain` npm package (CC BY 4.0, based on the work of MapSVG — credited in the site footer). Each region page inlines the full map with that region's path given an `is-active` class so it renders highlighted against the rest of the country.

## Notes for next session

- Region overview copy, provinces sub-pages (local news/what's on), and all stub-page content (Culture, Live, News, etc.) still need real content.
- Events page intentionally scoped to Spanish events happening *outside* Spain (festivals/championships/exhibitions abroad) — matches the same fix planned for Ireland's Events page.
- Design intentionally avoids literal flag colours as the site-wide palette — uses Andalusian plaster/terracotta/azulejo-tile tones instead, with the flag reserved for the hero accent.
