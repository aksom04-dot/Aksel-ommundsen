/**
 * Varslingslag for Trygg Hjemme.
 *
 * I MVP vises varsler kun i pårørende-dashboardet (les direkte fra databasen).
 * Denne funksjonen er stedet der SMS-varsling kan kobles på senere, f.eks.
 * ved rød status eller ny hjelpeforespørsel, uten å endre kall-stedene.
 */
export type Varseltype = "ROD_STATUS" | "NY_HJELPEFORESPORSEL";

export interface VarselPayload {
  type: Varseltype;
  familieId: string;
  melding: string;
}

export async function sendVarsel(payload: VarselPayload): Promise<void> {
  // TODO: koble på SMS-leverandør (f.eks. Twilio/Vonage) her når det er klart.
  // For nå: ingen effekt. Dashboardet henter status direkte fra databasen.
  void payload;
}
