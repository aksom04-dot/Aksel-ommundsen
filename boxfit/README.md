# Sotra Gym (Boxfit) – ny nettside

En enkel, rask nettside uten innlogging eller database. Den består av fire filer:

| Fil | Hva den gjør |
|---|---|
| `data.js` | **Alt innhold**: kontaktinfo, treninger, timeplan og priser. Det er bare denne fila du trenger å endre. |
| `index.html` | Oppsettet til siden |
| `styles.css` | Utseende (farger, skrift) |
| `app.js` | Timeplan, påmelding og drop-in-booking |
| `bilder/` | Logo og illustrasjoner til de tre treningene |

## Før siden publiseres

Alt innhold i `data.js` er **eksempler**. Disse må byttes ut med riktige tall fra Boxfit:

- [ ] Adresse, telefon, e-post, Instagram og Facebook
- [ ] Hvilke treninger som tilbys og beskrivelsen av dem
- [ ] Timeplan (dager og klokkeslett)
- [ ] Priser og medlemskap
- [ ] **Logo:** `bilder/logo-midlertidig.jpg` er klippet ut av et mobilbilde. Få originalfila (PNG eller SVG) fra gymmet, legg den i `bilder/` og bytt filnavnet i `index.html`. Selve logoen skal ikke endres.
- [ ] Bilder: illustrasjonene i `bilder/` kan byttes med ekte bilder fra gymmet (endre `bilde:` i `data.js`)

## Hvordan påmeldinger kommer frem

- **Standard:** Når noen melder seg på, åpnes en ferdig utfylt e-post til Boxfit sin adresse. Kunden trykker «Send».
- **Anbefalt:** Lag en gratis konto på [formspree.io](https://formspree.io), lag et skjema og lim inn adressen i `skjemaAdresse` i `data.js`. Da kommer påmeldingene rett i innboksen uten at kunden må sende e-post selv.

## Se siden

Dobbeltklikk `index.html` for å åpne den i nettleseren.

## Publisere (gratis)

Dra hele `boxfit`-mappa inn på [app.netlify.com/drop](https://app.netlify.com/drop). Domenet `boxfitsotra.net` kan kobles til etterpå i Netlify-innstillingene.

Skjermbilder ligger i `skjermbilder/`.
