/*
 * ============================================================
 *  BOXFIT SOTRA – ALT INNHOLD SOM SKAL ENDRES LIGGER HER
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
    navn: "Boxfit Sotra",
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

  /* ---------- Treningstilbud ---------- */
  sporter: [
    {
      id: "boksing",
      navn: "Boksing",
      ikon: "🥊",
      niva: "Nybegynner – viderekommen",
      kort: "Teknikk, fotarbeid og kondisjon. Lær grunnslagene trygt med trener.",
      lang: "Du lærer stilling, fotarbeid, slag og forsvar. Vi trener på sekk, mitts og i par. Ingen sparring uten at du selv ønsker det. Passer for alle som vil komme i form og lære en ekte kampsport.",
      ta_med: "Treningstøy, innesko eller barbent, drikkeflaske. Hansker kan lånes."
    },
    {
      id: "kickboksing",
      navn: "Kickboksing",
      ikon: "🦵",
      niva: "Nybegynner – viderekommen",
      kort: "Slag og spark i kombinasjon. Effektiv helkroppstrening.",
      lang: "Kombinerer boksing med spark og kneteknikker. Gir god kondisjon, styrke og bevegelighet. Treningen tilpasses nivået ditt.",
      ta_med: "Treningstøy, drikkeflaske. Hansker og leggbeskyttere kan lånes."
    },
    {
      id: "boxfit",
      navn: "Boxfit",
      ikon: "🔥",
      niva: "Alle nivåer",
      kort: "Høy puls med boksing som grunnlag. Ingen kontakt – bare svette.",
      lang: "Intervalltrening med sekk, mitts, kroppsvekt og kondisjonsøvelser. Ingen kampsporterfaring nødvendig – du jobber i ditt eget tempo.",
      ta_med: "Treningstøy, håndkle, drikkeflaske."
    },
    {
      id: "styrke",
      navn: "Styrke & kondisjon",
      ikon: "💪",
      niva: "Alle nivåer",
      kort: "Funksjonell styrke i små grupper med oppfølging.",
      lang: "Sirkeltrening med kettlebells, frivekter og kroppsvekt. Fokus på riktig teknikk og jevn fremgang.",
      ta_med: "Treningstøy, innesko, drikkeflaske."
    },
    {
      id: "ungdom",
      navn: "Ungdom 12–17 år",
      ikon: "⭐",
      niva: "12–17 år",
      kort: "Trygg boksetrening for ungdom med fokus på mestring.",
      lang: "Vi lærer grunnteknikk, samarbeid og respekt. Treningen er lekbetont og trygg, med fokus på mestring og fellesskap.",
      ta_med: "Treningstøy, drikkeflaske. Utstyr kan lånes."
    }
  ],

  /* ---------- Timeplan (dag 1 = mandag … 7 = søndag) ---------- */
  timeplan: [
    { dag: 1, tid: "17:00–18:00", sport: "boxfit",      dropin: true  },
    { dag: 1, tid: "18:15–19:30", sport: "boksing",     dropin: true  },
    { dag: 2, tid: "17:00–18:00", sport: "ungdom",      dropin: false },
    { dag: 2, tid: "18:15–19:30", sport: "kickboksing", dropin: true  },
    { dag: 3, tid: "06:30–07:30", sport: "styrke",      dropin: true  },
    { dag: 3, tid: "18:15–19:30", sport: "boksing",     dropin: true  },
    { dag: 4, tid: "17:00–18:00", sport: "ungdom",      dropin: false },
    { dag: 4, tid: "18:15–19:15", sport: "boxfit",      dropin: true  },
    { dag: 5, tid: "17:00–18:00", sport: "styrke",      dropin: true  },
    { dag: 6, tid: "10:00–11:30", sport: "kickboksing", dropin: true  },
    { dag: 7, tid: "11:00–12:00", sport: "boxfit",      dropin: true  }
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
      id: "ungdom",
      navn: "Ungdom",
      pris: 349,
      enhet: "per måned",
      punkter: ["12–17 år", "Ungdomsgruppa + åpne timer", "Foresatt signerer"],
      knapp: "Meld på",
      type: "gruppe"
    }
  ],

  innmeldingsavgift: "Ingen innmeldingsavgift",
  prisFotnote: "Student/honnør: 20 % rabatt på månedsmedlemskap. Alle priser inkl. mva."
};
