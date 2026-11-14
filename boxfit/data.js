/*
 * ============================================================
 *  SOTRA GYM / BOXFIT SOTRA – ALT INNHOLD LIGGER HER
 * ============================================================
 *  Rediger tekst, priser, timeplan og kontaktinfo i denne fila.
 *  Resten av nettsiden oppdaterer seg automatisk.
 *
 *  Tekster og priser er hentet fra boxfitsotra.net.
 *  Det som er merket TODO må fylles inn / sjekkes.
 * ============================================================
 */

window.BOXFIT = {
  /* ---------- Kontaktinfo ---------- */
  kontakt: {
    navn: "Sotra Gym",
    adresse: "Straume, like ved Sartor Senter",  // TODO: eksakt gateadresse
    telefon: "",                                 // TODO: telefonnummer (tomt = skjules)
    epost: "post@boxfitsotra.net",               // TODO: riktig e-post
    instagram: "",                               // TODO: lenke (tomt = skjules)
    facebook: "",                                // TODO: lenke (tomt = skjules)
    kart: "https://maps.google.com/?q=Sartor+Senter+Straume"
  },

  /* Lenke til eksisterende innlogging / Min side. Tom = knappen skjules. */
  loggInnUrl: "#",                               // TODO: lim inn lenken til medlemssystemet

  /*
   * Hvor påmeldinger sendes.
   * - Tom ("") → påmeldingen åpnes som en ferdig utfylt e-post.
   * - Formspree-adresse (gratis, formspree.io), f.eks.
   *   "https://formspree.io/f/abcdwxyz" → påmeldinger kommer rett i innboksen.
   */
  skjemaAdresse: "",

  /* ---------- Gruppetimer ----------
   * farge: fargekoden gruppen har på HELE siden (timeplan, priser, påmelding).
   * forBarn: true → påmeldingen ber om navn på foresatt.
   */
  grupper: [
    {
      id: "boxing", navn: "Boxing Fitness", farge: "#3B8BEB",
      bilde: "bilder/gruppe-boxing.svg", niva: "Alle nivåer",
      kort: "Forbedre utholdenhet og styrke samtidig som du lærer grunnleggende bokseteknikker.",
      lang: "Forbedre utholdenhet og styrke samtidig som du lærer grunnleggende bokseteknikker gjennom våre gode og gøye boksing-inspirerte økter.",
      ta_med: "Treningstøy, håndkle og drikkeflaske. Hansker kan lånes."
    },
    {
      id: "bootcamp", navn: "Bootcamp", farge: "#F28C28",
      bilde: "bilder/gruppe-bootcamp.svg", niva: "Alle nivåer",
      kort: "Intensiv sirkeltrening som kombinerer styrke og kondisjon.",
      lang: "Bootcamp er en intensiv sirkeltreningsøkt som kombinerer styrke og kondisjon. Perfekt for å forbedre utholdenhet og styrke samtidig som man har det gøy i en variert og motiverende time.",
      ta_med: "Treningstøy, innesko og drikkeflaske."
    },
    {
      id: "barbell", navn: "Barbell Complex", farge: "#14B8A6",
      bilde: "bilder/gruppe-barbell.svg", niva: "Alle nivåer",
      kort: "Flere vektstangøvelser i én sammenhengende rekkefølge.",
      lang: "Barbell Complex er en effektiv treningsmåte som kombinerer flere vektstangøvelser i en sammenhengende rekkefølge for å forbedre styrke, utholdenhet og teknikk.",
      ta_med: "Treningstøy, flate sko og drikkeflaske."
    },
    {
      id: "muaythai", navn: "Thaiboksing", farge: "#F5C400",
      bilde: "bilder/gruppe-muaythai.svg", niva: "Alle nivåer + fight camp",
      kort: "Muay Thai med erfarne instruktører – for mosjonister og konkurranseutøvere.",
      lang: "Opplev thaiboksing med våre erfarne instruktører. Øktene er designet for å forbedre fysisk kondisjon, utvikle teknisk ferdighet og mental styrke, alt i et trygt og støttende miljø. Alle er velkomne, enten du ønsker å konkurrere eller bare vil komme i form.",
      ta_med: "Treningstøy og drikkeflaske. Hansker og leggbeskyttere kan lånes."
    },
    {
      id: "ungdom", navn: "Thaiboksing ungdom", farge: "#8BD346",
      bilde: "bilder/gruppe-ungdom.svg", niva: "Ungdom", forBarn: true,
      kort: "Thaiboksing for ungdom – teknikk, form og godt miljø.",
      lang: "Egen gruppe for ungdom der man lærer thaiboksing fra grunnen av, kommer i god form og blir en del av et trygt og inkluderende miljø.",
      ta_med: "Treningstøy og drikkeflaske. Utstyr kan lånes."
    },
    {
      id: "barn", navn: "Thaiboksing for barn", farge: "#8B5CF6",
      bilde: "bilder/gruppe-barn.svg", niva: "6–12 år", forBarn: true,
      kort: "Lære teknikker, utvikle seg og føle mestring i en trygg atmosfære.",
      lang: "Thaiboksing for barn 6–12 år. Barna lærer teknikker, utvikler seg og føler mestring i en trygg, motiverende og gøy atmosfære.",
      ta_med: "Treningstøy og drikkeflaske. Utstyr kan lånes."
    },
    {
      id: "oyane", navn: "Øyane Boksing", farge: "#E5383B",
      bilde: "bilder/gruppe-oyane.svg", niva: "Barn og ungdom", forBarn: true,
      kort: "Boksetrening i samarbeid med ADHD Norge Øyane.",
      lang: "Boksetrening for barn og ungdom i samarbeid med ADHD Norge Øyane. Et trygt sted å få ut energi, lære noe nytt og ha det gøy sammen med andre.",
      ta_med: "Treningstøy og drikkeflaske. Utstyr kan lånes."
    }
  ],

  /* ---------- Timeplan (dag 1 = mandag … 7 = søndag) ----------
   * TODO: EKSEMPEL – bytt til ekte timeplan.
   */
  timeplan: [
    { dag: 1, tid: "17:00–18:00", gruppe: "boxing",   dropin: true  },
    { dag: 1, tid: "18:15–19:30", gruppe: "muaythai", dropin: true  },
    { dag: 2, tid: "17:00–18:00", gruppe: "barn",     dropin: false },
    { dag: 2, tid: "18:15–19:15", gruppe: "bootcamp", dropin: true  },
    { dag: 3, tid: "17:00–18:00", gruppe: "barbell",  dropin: true  },
    { dag: 3, tid: "18:15–19:30", gruppe: "ungdom",   dropin: false },
    { dag: 4, tid: "17:00–18:00", gruppe: "oyane",    dropin: false },
    { dag: 4, tid: "18:15–19:30", gruppe: "muaythai", dropin: true  },
    { dag: 5, tid: "17:00–18:00", gruppe: "boxing",   dropin: true  },
    { dag: 6, tid: "10:00–11:00", gruppe: "bootcamp", dropin: true  },
    { dag: 6, tid: "11:15–12:15", gruppe: "barbell",  dropin: true  },
    { dag: 7, tid: "11:00–12:30", gruppe: "muaythai", dropin: true  }
  ],

  /* ---------- Medlemskap og priser ----------
   * priser: { 12: pris med 12 mnd binding, 6: med 6 mnd, 0: uten binding }
   * grupper: hvilke gruppetimer medlemskapet gir tilgang til (styrer fargene).
   * type: "medlemskap" | "gruppe" (barn/ungdom) | "dropin" | "tillegg"
   */
  medlemskap: [
    { id: "alle", navn: "Boxfit – alle timer", type: "medlemskap", populaer: true,
      grupper: ["boxing", "bootcamp", "barbell", "muaythai"],
      priser: { 12: 699, 6: 749, 0: 799 } },
    { id: "fitness", navn: "Boxing Fitness, Bootcamp og Barbell Complex", type: "medlemskap",
      grupper: ["boxing", "bootcamp", "barbell"],
      priser: { 12: 599, 6: 649, 0: 699 } },
    { id: "thai", navn: "Thaiboksing – alle nivå og fight camp", type: "medlemskap",
      grupper: ["muaythai"],
      priser: { 12: 599, 6: 649, 0: 699 } },
    { id: "ungdom", navn: "Thaiboksing ungdom", type: "gruppe",
      grupper: ["ungdom"],
      priser: { 12: 499, 6: 549, 0: 599 } },
    { id: "barn", navn: "Thaiboksing for barn", type: "gruppe",
      grupper: ["barn"],
      priser: { 12: 399, 6: 449, 0: 499 } },
    { id: "oyane", navn: "Øyane Boksing – ADHD Norge", type: "gruppe",
      grupper: ["oyane"],
      pris: 200, enhet: "/mnd" },
    { id: "dropin", navn: "Drop-in", type: "dropin",
      grupper: [],
      pris: 199, enhet: "/time" },
    { id: "sauna", navn: "Strilasauna – tillegg", type: "tillegg",
      grupper: [],
      pris: 349, enhet: "/mnd", merknad: "12 mnd binding" }
  ],

  /* ---------- Om oss ---------- */
  omOss: [
    "Vi er et engasjert og inkluderende gruppetrenings- og kampsportsenter med et godt treningsmiljø på Sotra, like ved Sartor Senter.",
    "Sotra Muay Thai har trening for barn, ungdom og voksne. Alle er velkomne – enten du ønsker å konkurrere, eller vil trene for å komme i form og samtidig utvikle deg innen thaiboksing.",
    "Boxfit tilbyr varierte timer som Boxing Fitness, sirkeltrening som Bootcamp, og Barbell Complex.",
    "Våre erfarne trenere er dedikert til å hjelpe deg med å nå dine mål. Enten du er nybegynner eller erfaren utøver, har vi timer som tilpasses dine behov."
  ]
};
