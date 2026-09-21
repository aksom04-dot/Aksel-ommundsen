// SQLite (via Prisma) støtter ikke native enums, så disse verdiene lagres
// som String i databasen og typestyres her i applikasjonskoden.

export const ROLLE = {
  SENIOR: "SENIOR",
  PARORENDE: "PARORENDE",
} as const;
export type Rolle = (typeof ROLLE)[keyof typeof ROLLE];

export const HJELPE_TYPE = {
  DIGITAL: "DIGITAL",
  PRAKTISK: "PRAKTISK",
  RING_MEG: "RING_MEG",
} as const;
export type HjelpeType = (typeof HJELPE_TYPE)[keyof typeof HJELPE_TYPE];

export const FORESPORSEL_STATUS = {
  NY: "NY",
  TATT: "TATT",
  FERDIG: "FERDIG",
} as const;
export type ForesporselStatus =
  (typeof FORESPORSEL_STATUS)[keyof typeof FORESPORSEL_STATUS];

export const TJENESTE = {
  DIGITAL_HJELP: "DIGITAL_HJELP",
  PRAKTISK_HJELP: "PRAKTISK_HJELP",
} as const;
export type Tjeneste = (typeof TJENESTE)[keyof typeof TJENESTE];

export const TJENESTE_TIMEPRIS_ORE: Record<Tjeneste, number> = {
  DIGITAL_HJELP: 59500, // 595 kr/t
  PRAKTISK_HJELP: 49500, // 495 kr/t
};

export const HJELPE_TYPE_TEKST: Record<HjelpeType, string> = {
  DIGITAL: "Hjelp med mobil/PC/BankID",
  PRAKTISK: "Praktisk hjelp hjemme",
  RING_MEG: "Ring meg",
};
