# Frid Logistics AS – nettside

En statisk nettside for Frid Logistics AS i Ski. Ingen byggesteg: `index.html`, `styles.css` og `main.js`.

## Se siden lokalt

```bash
cd frid-logistic
python3 -m http.server 8000
# åpne http://localhost:8000
```

## Dette må fylles inn før lansering

Søk etter `TODO` i filene. Alt er plassholdere til nå:

- **Telefonnummer** – `+47 000 00 000` (i `index.html`, flere steder)
- **E-post** – `post@fridlogistic.no` (i `index.html` og `FALLBACK_EMAIL` i `main.js`)
- **Bilde av Mikael, teamet eller bilene** – erstatt `.photo-placeholder` i «Om oss»
- Sjekk at **tjenestene, området (Follo/Oslo)** og løftet om **svar innen neste arbeidsdag** stemmer
- Logoene er klippet ut fra et skjermbilde og er ganske små. Be om originalfilene (SVG/PNG) fra kundene og Frid, og bytt ut filene i `assets/logo/`

## Publisering og tilbudsskjema

Siden er laget for **Netlify** (gratis): dra mappen `frid-logistic` inn på app.netlify.com/drop.
Tilbudsskjemaet bruker Netlify Forms, og forespørslene kommer inn under *Forms* i Netlify.
Der kan du slå på e-postvarsel til Mikael.

Hvis siden publiseres et annet sted, fungerer skjemaet likevel: da åpnes e-postprogrammet
til besøkende med forespørselen ferdig utfylt til `FALLBACK_EMAIL`.
