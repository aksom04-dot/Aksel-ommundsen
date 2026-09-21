import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAVN = "trygg-hjemme-sesjon";
const HEMMELIGHET = process.env.AUTH_SECRET ?? "utvikling-hemmelig-nokkel";

export interface SesjonData {
  brukerId: string;
  rolle: "SENIOR" | "PARORENDE";
}

function signer(verdi: string): string {
  return crypto
    .createHmac("sha256", HEMMELIGHET)
    .update(verdi)
    .digest("hex");
}

function pakkSesjon(data: SesjonData): string {
  const payload = Buffer.from(JSON.stringify(data)).toString("base64url");
  const signatur = signer(payload);
  return `${payload}.${signatur}`;
}

function pakkOppSesjon(cookieVerdi: string): SesjonData | null {
  const [payload, signatur] = cookieVerdi.split(".");
  if (!payload || !signatur) return null;
  if (signer(payload) !== signatur) return null;

  try {
    return JSON.parse(Buffer.from(payload, "base64url").toString("utf-8"));
  } catch {
    return null;
  }
}

export async function settSesjon(data: SesjonData): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAVN, pakkSesjon(data), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function hentSesjon(): Promise<SesjonData | null> {
  const cookieStore = await cookies();
  const verdi = cookieStore.get(COOKIE_NAVN)?.value;
  if (!verdi) return null;
  return pakkOppSesjon(verdi);
}

export async function slettSesjon(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAVN);
}
