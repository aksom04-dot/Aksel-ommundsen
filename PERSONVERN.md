# Personvern i Trygg Hjemme

Trygg Hjemme er laget for å lagre så lite data som mulig. Denne siden
beskriver hva vi lagrer, hvorfor, og hvordan du kan slette det.

## Hva lagres

| Data | Hvorfor |
|---|---|
| Navn og rolle (senior/pårørende) | For å vise riktig skjerm og koble familiemedlemmer sammen |
| PIN-kode (senior) / passord (pårørende) — lagres kryptert (hashet), aldri i klartekst | For innlogging |
| E-post (pårørende) | For innlogging |
| Tidspunkt for daglig innsjekk ("Jeg har det bra i dag") | For å vise status til pårørende |
| Bekreftelse på at medisiner er tatt (kun ja/tidspunkt) | For å vise status til pårørende |
| Hvilken type hjelp som er forespurt (digital/praktisk/ring meg) og status på forespørselen | For å koble senioren med riktig hjelp |
| Bestillinger av betalt hjelp (tjeneste, pris, status) | For å administrere bestilt hjelp |
| Samtykkestatus og tidspunkt | For å dokumentere at samtykke er gitt |
| Innstillinger (frist for innsjekk, hvem som har tilgang) | For å tilpasse varsling og tilgang |

## Hva lagres aldri

- Navn på medisiner, doser eller diagnoser
- Annen helseinformasjon utover boolsk "innsjekket" / "medisin bekreftet"
- Integrasjon mot Helsenorge eller andre helsesystemer
- Innhold i telefonsamtaler ved "Ring meg"

## Hvem ser dataen

Kun pårørende som er koblet til samme familie, og som har fått tilgang i
innstillingene, kan se senioren sin status og hjelpeforespørsler. Senioren
kan når som helst se og endre hvem som har tilgang, via pårørende sine
innstillinger.

## Samtykke

Første gang en senior åpner appen, må hen samtykke til at denne
informasjonen deles med familien. Samtykke kan trekkes tilbake når som
helst fra "Personvern og mine data" på senior-skjermen.

## Sletting

Når en senior trekker samtykket, slettes umiddelbart og permanent:

- Brukerkontoen (PIN)
- All innsjekk-historikk
- Alle medisinbekreftelser
- Alle hjelpeforespørsler

Bestillinger av betalt hjelp som familien har gjort beholdes som en
regnskapspost for familien, men uten kobling til den slettede
hjelpeforespørselen.

## Fremtidig SMS-varsling

MVP-en viser varsler kun i pårørende-dashboardet. Koden har et eget lag
(`src/lib/varsling.ts`) klargjort for å koble på SMS-varsling senere, uten
å endre datamodellen eller hvilken informasjon som deles.
