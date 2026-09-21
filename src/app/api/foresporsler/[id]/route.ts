import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { hentSesjon } from "@/lib/sesjon";

const kropp = z.object({
  status: z.enum(["NY", "TATT", "FERDIG"]),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const sesjon = await hentSesjon();
  if (!sesjon || sesjon.rolle !== "PARORENDE") {
    return NextResponse.json({ feil: "Ikke innlogget." }, { status: 401 });
  }

  const parsing = kropp.safeParse(await request.json());
  if (!parsing.success) {
    return NextResponse.json({ feil: "Ugyldig status." }, { status: 400 });
  }

  const { id } = await params;
  const foresporsel = await prisma.hjelpeforesporsel.findUnique({
    where: { id },
    include: { bruker: true },
  });
  if (!foresporsel) {
    return NextResponse.json({ feil: "Fant ikke forespørsel." }, { status: 404 });
  }

  const parorende = await prisma.bruker.findUnique({
    where: { id: sesjon.brukerId },
  });
  if (!parorende || parorende.familieId !== foresporsel.bruker.familieId) {
    return NextResponse.json({ feil: "Ingen tilgang." }, { status: 403 });
  }

  await prisma.hjelpeforesporsel.update({
    where: { id },
    data: { status: parsing.data.status },
  });

  return NextResponse.json({ ok: true });
}
