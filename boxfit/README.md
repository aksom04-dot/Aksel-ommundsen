# Sotra Gym / Boxfit Sotra – ny nettside

En enkel, rask nettside uten innlogging eller database. Den består av fire filer:

| Fil | Hva den gjør |
|---|---|
| `data.js` | **Alt innhold**: kontaktinfo, treninger, timeplan og priser. Det er bare denne fila du trenger å endre. |
| `index.html` | Oppsettet til siden |
| `styles.css` | Utseende (farger, skrift) |
| `app.js` | Timeplan, påmelding og drop-in-booking |
| `bilder/` | Logo og illustrasjoner til de tre treningene |

## Før siden publiseres

Tekster og priser er hentet fra boxfitsotra.net. Dette må fortsatt fylles inn i `data.js`:

- [ ] Sjekk hvilke timer som er åpne for drop-in (`dropin` i timeplanen)
- [ ] Instagram/Facebook-lenker
- [ ] `loggInnUrl` – lenken til medlemssystemet (knappen «Logg inn»)


## Logo, bilder og farger

- `bilder/logo-hvit.png` (meny) og `bilder/logo-solv.png` (forside/bunn) er laget fra logoen, bare med ny farge. Har gymmet originalfila (PNG/SVG), blir de skarpere om de lages fra den.
- `bilder/foto-*.jpg` er hentet fra skjermbilder av dagens side. Originalbildene gir bedre kvalitet – bytt dem i `galleri` i `data.js`.
- Fargekodene (`farge` i `data.js`) brukes kun i timeplanen og prislista: Boxing Fitness blå, Bootcamp oransje, Barbell Complex turkis, Thaiboksing gul, Ungdom lysegrønn, Barn fiolett, Øyane Boksing (ADHD Norge) rød.

## Koble til medlemssystemet / booking-appen

Fyll inn `medlemssystem` i `data.js` med det app-selskapet gir dere:

| Felt | Hva skjer |
|---|---|
| `innmeldingUrl` | «Bli medlem» og «Meld deg inn» åpner innmeldingen i appen |
| `bookingUrl` | «Book drop-in» og trykk på timer i timeplanen åpner bookingen i appen |
| `timeplanEmbed` | Appens egen timeplan (med ledige plasser) vises i stedet for timeplanen på siden |

Står feltene tomme, brukes nettsidens egen påmelding.

## Hvordan påmeldinger kommer frem

- **Standard:** Når noen melder seg på, åpnes en ferdig utfylt e-post til Boxfit sin adresse. Kunden trykker «Send».
- **Anbefalt:** Lag en gratis konto på [formspree.io](https://formspree.io), lag et skjema og lim inn adressen i `skjemaAdresse` i `data.js`. Da kommer påmeldingene rett i innboksen uten at kunden må sende e-post selv.

## Se siden

Dobbeltklikk `index.html` for å åpne den i nettleseren.

## Publisere (gratis)

Dra hele `boxfit`-mappa inn på [app.netlify.com/drop](https://app.netlify.com/drop). Domenet `boxfitsotra.net` kan kobles til etterpå i Netlify-innstillingene.

Skjermbilder ligger i `skjermbilder/`.
