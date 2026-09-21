import bcrypt from "bcryptjs";

export async function hashPin(pin: string): Promise<string> {
  return bcrypt.hash(pin, 10);
}

export async function sjekkPin(pin: string, hash: string): Promise<boolean> {
  return bcrypt.compare(pin, hash);
}

export async function hashPassord(passord: string): Promise<string> {
  return bcrypt.hash(passord, 10);
}

export async function sjekkPassord(
  passord: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(passord, hash);
}

export const SESJON_COOKIE = "trygg-hjemme-sesjon";
