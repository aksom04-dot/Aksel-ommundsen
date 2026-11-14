/*
 * ============================================================
 *  SOTRA GYM (BOXFIT) – ALT INNHOLD SOM SKAL ENDRES LIGGER HER
 * ============================================================
 *  Rediger tekst, priser, timeplan og kontaktinfo i denne fila.
 *  Resten av nettsiden oppdaterer seg automatisk.
 *
 *  OBS: Alt under er EKSEMPELINNHOLD. Bytt ut med riktige
 *  opplysninger fra Boxfit før siden publiseres.
 * ============================================================
 */

window.BOXFIT = {
  /* ---------- Kontaktinfo ---------- */
  kontakt: {
    navn: "Sotra Gym",
    adresse: "Adresse kommer, 5353 Straume",   // TODO: riktig adresse
    telefon: "+47 000 00 000",                  // TODO
    epost: "post@boxfitsotra.net",              // TODO: riktig e-post
    instagram: "https://www.instagram.com/",    // TODO
    facebook: "https://www.facebook.com/",      // TODO
    kart: "https://maps.google.com/?q=Straume+Sotra"
  },

  /*
   * Hvor påmeldinger sendes.
   * - La stå tom ("") → påmeldingen åpnes som en ferdig utfylt e-post
   *   til adressen over.
   * - Lim inn en Formspree-adresse (gratis, formspree.io), f.eks.
   *   "https://formspree.io/f/abcdwxyz" → påmeldinger kommer rett i
   *   innboksen uten at kunden trenger å sende e-post selv.
   */
  skjemaAdresse: "",

  /* ---------- Treningstilbud ----------
   * bilde: bytt gjerne til ekte bilder fra gymmet, f.eks. "bilder/muay-thai.jpg"
   */
  sporter: [
    {
      id: "boxing",
      navn: "Boxing Fitness",
      bilde: "bilder/boxing-fitness.svg",
      niva: "Alle nivåer",
      kort: "Høy puls med boksing som grunnlag. Ingen sparring – bare svette.",
      lang: "Intervalltrening med sekk, mitts, kroppsvekt og kondisjonsøvelser. Du lærer grunnslagene i boksing samtidig som du får god kondisjon. Ingen erfaring nødvendig – du jobber i ditt eget tempo.",
      ta_med: "Treningstøy, håndkle, drikkeflaske. Hansker kan lånes."
    },
    {
      id: "barbell",
      navn: "Barbell Complex",
      bilde: "bilder/barbell.svg",
      niva: "Alle nivåer",
      kort: "Styrketrening med vektstang. Teknikk, kraft og fremgang.",
      lang: "Økter bygget rundt vektstanga: knebøy, markløft, press og olympiske løft satt sammen i komplekser. Treneren hjelper deg med riktig teknikk og passende vekt, så du blir sterkere uke for uke.",
      ta_med: "Treningstøy, flate sko, drikkeflaske."
    },
    {
      id: "muaythai",
      navn: "Muay Thai",
      bilde: "bilder/muay-thai.svg",
      niva: "Nybegynner – viderekommen",
      kort: "Thaiboksing med slag, spark, knær og albuer. Effektiv helkroppstrening.",
      lang: "Muay Thai kalles «de åtte lemmers kunst». Du lærer teknikk på pads og sekk, og trener i par. Sparring er frivillig og kun for de som ønsker det. Gir styrke, kondisjon og selvtillit.",
      ta_med: "Treningstøy, drikkeflaske. Hansker og leggbeskyttere kan lånes."
    }
  ],

  /* ---------- Timeplan (dag 1 = mandag … 7 = søndag) ---------- */
  timeplan: [
    { dag: 1, tid: "17:00–18:00", sport: "boxing",   dropin: true  },
    { dag: 1, tid: "18:15–19:30", sport: "muaythai", dropin: true  },
    { dag: 2, tid: "06:30–07:30", sport: "barbell",  dropin: true  },
    { dag: 2, tid: "18:15–19:15", sport: "boxing",   dropin: true  },
    { dag: 3, tid: "17:00–18:00", sport: "barbell",  dropin: true  },
    { dag: 3, tid: "18:15–19:30", sport: "muaythai", dropin: false },
    { dag: 4, tid: "17:00–18:00", sport: "boxing",   dropin: true  },
    { dag: 4, tid: "18:15–19:15", sport: "barbell",  dropin: true  },
    { dag: 5, tid: "17:00–18:00", sport: "muaythai", dropin: true  },
    { dag: 6, tid: "10:00–11:00", sport: "boxing",   dropin: true  },
    { dag: 6, tid: "11:15–12:15", sport: "barbell",  dropin: true  },
    { dag: 7, tid: "11:00–12:30", sport: "muaythai", dropin: true  }
  ],

  /* ---------- Priser ---------- */
  abonnement: [
    {
      id: "dropin",
      navn: "Drop-in",
      pris: 200,
      enhet: "per time",
      punkter: ["Ingen binding", "Prøv hvilken som helst åpen time", "Utstyr kan lånes"],
      knapp: "Book drop-in",
      type: "dropin"
    },
    {
      id: "klipp10",
      navn: "Klippekort 10",
      pris: 1600,
      enhet: "10 klipp",
      punkter: ["Gyldig i 6 måneder", "Alle drop-in-timer", "Spar 400 kr"],
      knapp: "Kjøp klippekort",
      type: "medlemskap"
    },
    {
      id: "fri",
      navn: "Fri trening",
      pris: 549,
      enhet: "per måned",
      punkter: ["Alle timer på timeplanen", "12 mnd binding", "Gratis prøvetime"],
      knapp: "Bli medlem",
      type: "medlemskap",
      anbefalt: true
    },
    {
      id: "fleks",
      navn: "Fleks",
      pris: 699,
      enhet: "per måned",
      punkter: ["Alle timer på timeplanen", "Ingen binding", "1 mnd oppsigelse"],
      knapp: "Bli medlem",
      type: "medlemskap"
    },
    {
      id: "student",
      navn: "Student",
      pris: 449,
      enhet: "per måned",
      punkter: ["Alle timer på timeplanen", "Gyldig studentbevis", "6 mnd binding"],
      knapp: "Bli medlem",
      type: "medlemskap"
    }
  ],

  innmeldingsavgift: "Ingen innmeldingsavgift",
  prisFotnote: "Alle priser inkl. mva. Gratis prøvetime for nye medlemmer."
};
