export type InnsjekkStatus = "GRONN" | "GUL" | "ROD";

function erSammeDag(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function fristSomDatoIDag(fristHHMM: string, naa: Date): Date {
  const [timer, minutter] = fristHHMM.split(":").map(Number);
  const frist = new Date(naa);
  frist.setHours(timer, minutter, 0, 0);
  return frist;
}

/**
 * Beregner dagens innsjekk-status for en senior.
 * - GRONN: har sjekket inn i dag (uansett klokkeslett).
 * - GUL: har ikke sjekket inn i dag, men fristen er ikke passert ennå.
 * - ROD: har ikke sjekket inn i dag, og fristen er passert.
 */
export function beregnInnsjekkStatus(
  sisteInnsjekk: Date | null,
  naa: Date,
  fristHHMM: string,
): InnsjekkStatus {
  if (sisteInnsjekk && erSammeDag(sisteInnsjekk, naa)) {
    return "GRONN";
  }

  const frist = fristSomDatoIDag(fristHHMM, naa);
  return naa < frist ? "GUL" : "ROD";
}
