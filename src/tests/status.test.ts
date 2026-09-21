import { describe, expect, it } from "vitest";
import { beregnInnsjekkStatus } from "@/lib/status";

describe("beregnInnsjekkStatus", () => {
  const frist = "11:00";

  it("er GRONN når senioren har sjekket inn i dag, uansett klokkeslett", () => {
    const naa = new Date(2026, 0, 15, 20, 0);
    const sisteInnsjekk = new Date(2026, 0, 15, 8, 30);
    expect(beregnInnsjekkStatus(sisteInnsjekk, naa, frist)).toBe("GRONN");
  });

  it("er GRONN selv om innsjekk skjedde etter fristen samme dag", () => {
    const naa = new Date(2026, 0, 15, 14, 0);
    const sisteInnsjekk = new Date(2026, 0, 15, 13, 0);
    expect(beregnInnsjekkStatus(sisteInnsjekk, naa, frist)).toBe("GRONN");
  });

  it("er GUL når ikke innsjekket i dag, men fristen er ikke passert", () => {
    const naa = new Date(2026, 0, 15, 9, 0);
    expect(beregnInnsjekkStatus(null, naa, frist)).toBe("GUL");
  });

  it("er GUL når siste innsjekk var i går, og dagens frist ikke er passert", () => {
    const naa = new Date(2026, 0, 15, 9, 0);
    const iGar = new Date(2026, 0, 14, 8, 0);
    expect(beregnInnsjekkStatus(iGar, naa, frist)).toBe("GUL");
  });

  it("er ROD når ikke innsjekket i dag, og fristen er passert", () => {
    const naa = new Date(2026, 0, 15, 12, 0);
    expect(beregnInnsjekkStatus(null, naa, frist)).toBe("ROD");
  });

  it("er ROD når siste innsjekk var i går, og dagens frist er passert", () => {
    const naa = new Date(2026, 0, 15, 12, 0);
    const iGar = new Date(2026, 0, 14, 8, 0);
    expect(beregnInnsjekkStatus(iGar, naa, frist)).toBe("ROD");
  });

  it("er ROD nøyaktig på fristtidspunktet uten innsjekk", () => {
    const naa = new Date(2026, 0, 15, 11, 0);
    expect(beregnInnsjekkStatus(null, naa, frist)).toBe("ROD");
  });

  it("er GUL ett minutt før fristen uten innsjekk", () => {
    const naa = new Date(2026, 0, 15, 10, 59);
    expect(beregnInnsjekkStatus(null, naa, frist)).toBe("GUL");
  });

  it("respekterer en annen konfigurert frist", () => {
    const naa = new Date(2026, 0, 15, 15, 30);
    expect(beregnInnsjekkStatus(null, naa, "16:00")).toBe("GUL");
    expect(beregnInnsjekkStatus(null, naa, "15:00")).toBe("ROD");
  });
});
