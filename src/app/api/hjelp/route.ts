import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { hentSesjon } from "@/lib/sesjon";
import { sendVarsel } from "@/lib/varsling";
import { HJELPE_TYPE_TEKST } from "@/lib/typer";

const kropp = z.object({
  type: z.enum(["DIGITAL", "PRAKTISK", "RING_MEG"]),
});

export async function POST(request: NextRequest) {
  const sesjon = await hentSesjon();
  if (!sesjon || sesjon.rolle !== "SENIOR") {
    return NextResponse.json({ feil: "Ikke innlogget." }, { status: 401 });
  }

  const parsing = kropp.safeParse(await request.json());
  if (!parsing.success) {
    return NextResponse.json({ feil: "Ugyldig type hjelp." }, { status: 400 });
  }

  const bruker = await prisma.bruker.findUnique({
    where: { id: sesjon.brukerId },
  });
  if (!bruker) {
    return NextResponse.json({ feil: "Fant ikke bruker." }, { status: 404 });
  }

  const foresporsel = await prisma.hjelpeforesporsel.create({
    data: { brukerId: bruker.id, type: parsing.data.type },
  });

  await sendVarsel({
    type: "NY_HJELPEFORESPORSEL",
    familieId: bruker.familieId,
    melding: `${bruker.navn} ber om: ${HJELPE_TYPE_TEKST[parsing.data.type]}`,
  });

  return NextResponse.json({ ok: true, id: foresporsel.id });
}
