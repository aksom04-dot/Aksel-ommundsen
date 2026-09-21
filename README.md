# Trygg Hjemme

En enkel trygghetsapp som bygger bro mellom en senior (forelder) og de
voksne barna. Senioren har alltid kontroll over hva som deles.

Dette er en **MVP** (minste levedyktige produkt) — laget for utprøving,
ikke for produksjon. Se [PERSONVERN.md](./PERSONVERN.md) for hva som
lagres og hvorfor.

## Hva du trenger før du starter

Du trenger to ting installert på datamaskinen din:

1. **Node.js** (versjon 20 eller nyere) — last ned fra
   [nodejs.org](https://nodejs.org/). Etter installasjon, sjekk at det
   fungerer ved å skrive dette i terminalen:
   ```
   node -v
   ```
   Du bør se noe som `v20.x.x` eller høyere.
2. En terminal (Mac: "Terminal"-appen, Windows: "PowerShell" eller
   "Command Prompt").

Du trenger **ikke** installere noen database separat — appen bruker
SQLite, som er en enkel databasefil som opprettes automatisk lokalt på
maskinen din.

## Kom i gang — steg for steg

Åpne terminalen, naviger til mappen prosjektet ligger i, og kjør disse
kommandoene **én etter én**:

### 1. Installer avhengigheter

Dette laster ned alle byggeklossene appen trenger for å kjøre.

```
npm install
```

Dette kan ta noen minutter første gang.

### 2. Sett opp miljøvariabler

Appen trenger en konfigurasjonsfil som forteller den hvor databasen skal
ligge. Kopier eksempelfilen:

```
cp .env.example .env
```

(På Windows i PowerShell: `copy .env.example .env`)

Du trenger ikke endre noe i denne filen for å kjøre appen lokalt.

### 3. Opprett databasen

Dette lager selve databasefilen og alle tabellene appen trenger:

```
npx prisma migrate dev
```

### 4. Fyll databasen med testdata

Dette lager en oppdiktet familie du kan logge inn og teste med:

```
npm run prisma:seed
```

Du vil se en beskjed i terminalen med innloggingsinformasjon, blant annet:

- **Senior-PIN** (Astrid Hansen): `1234`
- **Pårørende-innlogging**: `kari@eksempel.no` / `Passord123`
- **Pårørende-innlogging**: `ola@eksempel.no` / `Passord123`

### 5. Start appen

```
npm run dev
```

Åpne nettleseren og gå til:

```
http://localhost:3000
```

Der kan du velge om du vil logge inn som senior (med PIN-koden over) eller
som pårørende (med e-post og passord over).

For å stoppe appen, gå tilbake til terminalen og trykk `Ctrl + C`.

## Andre nyttige kommandoer

| Kommando | Hva den gjør |
|---|---|
| `npm run dev` | Starter appen lokalt for utvikling |
| `npm run build` | Bygger en produksjonsklar versjon |
| `npm run test` | Kjører de automatiske testene |
| `npx prisma studio` | Åpner et vindu der du kan se og redigere databasen visuelt |
| `npx prisma migrate reset --force` | Nullstiller databasen og kjører seed på nytt (sletter alt og starter på nytt) |

## Hvis noe går galt

- **"command not found: npm"** — Node.js er ikke installert riktig. Se
  steg 1 over.
- **Portkonflikt / "port 3000 already in use"** — noe annet bruker
  allerede port 3000. Kjør i stedet `npm run dev -- -p 3001` og bruk
  `http://localhost:3001`.
- **Vil starte helt på nytt** — slett filen `prisma/dev.db` og kjør steg 3
  og 4 igjen.

## Teknisk oversikt

- **Next.js** (App Router) + **TypeScript** + **Tailwind CSS**
- **SQLite** database via **Prisma** ORM
- Senior logger inn med 4-sifret PIN, pårørende med e-post/passord
  (passord lagres kryptert med bcrypt)
- Varsler vises i dashboardet i denne versjonen. `src/lib/varsling.ts` er
  det forberedte stedet for å koble på SMS-varsling senere
- Se `PERSONVERN.md` for personvern og datahåndtering
