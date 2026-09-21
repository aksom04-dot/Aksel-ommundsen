import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hentSesjon, slettSesjon } from "@/lib/sesjon";

export async function POST() {
  const sesjon = await hentSesjon();
  if (!sesjon || sesjon.rolle !== "SENIOR") {
    return NextResponse.json({ feil: "Ikke innlogget." }, { status: 401 });
  }

  await prisma.samtykke.upsert({
    where: { brukerId: sesjon.brukerId },
    create: { brukerId: sesjon.brukerId, gitt: true },
    update: { gitt: true, trukket: false, tidspunkt: new Date(), trukketTidspunkt: null },
  });

  return NextResponse.json({ ok: true });
}

// Trekker samtykke og sletter all lagret data for senioren permanent.
export async function DELETE() {
  const sesjon = await hentSesjon();
  if (!sesjon || sesjon.rolle !== "SENIOR") {
    return NextResponse.json({ feil: "Ikke innlogget." }, { status: 401 });
  }

  // Kaskade i databasen fjerner også innsjekk, medisinbekreftelser,
  // hjelpeforespørsler og samtykkeposten til denne brukeren.
  await prisma.bruker.delete({ where: { id: sesjon.brukerId } });
  await slettSesjon();

  return NextResponse.json({ ok: true });
}
