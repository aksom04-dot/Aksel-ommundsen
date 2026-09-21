import { NextResponse } from "next/server";
import { slettSesjon } from "@/lib/sesjon";

export async function POST() {
  await slettSesjon();
  return NextResponse.json({ ok: true });
}
