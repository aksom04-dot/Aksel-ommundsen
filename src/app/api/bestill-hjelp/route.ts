import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { hentSesjon } from "@/lib/sesjon";
import { TJENESTE_TIMEPRIS_ORE } from "@/lib/typer";

const kropp = z.object({
  tjeneste: z.enum(["DIGITAL_HJELP", "PRAKTISK_HJELP"]),
});

export async function POST(request: NextRequest) {
  const sesjon = await hentSesjon();
  if (!sesjon || sesjon.rolle !== "PARORENDE") {
    return NextResponse.json({ feil: "Ikke innlogget." }, { status: 401 });
  }

  const parsing = kropp.safeParse(await request.json());
  if (!parsing.success) {
    return NextResponse.json({ feil: "Ugyldig tjeneste." }, { status: 400 });
  }

  const bruker = await prisma.bruker.findUnique({
    where: { id: sesjon.brukerId },
  });
  if (!bruker) {
    return NextResponse.json({ feil: "Fant ikke bruker." }, { status: 404 });
  }

  const bestilling = await prisma.bestilling.create({
    data: {
      familieId: bruker.familieId,
      bestiltAvId: bruker.id,
      tjeneste: parsing.data.tjeneste,
      timeprisOre: TJENESTE_TIMEPRIS_ORE[parsing.data.tjeneste],
    },
  });

  return NextResponse.json({ ok: true, id: bestilling.id });
}
