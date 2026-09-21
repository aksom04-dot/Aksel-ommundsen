import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { hentSesjon } from "@/lib/sesjon";
import { ROLLE } from "@/lib/typer";

const kropp = z.object({
  sjekkinnFrist: z
    .string()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/)
    .optional(),
  tilgang: z
    .array(z.object({ brukerId: z.string(), harTilgang: z.boolean() }))
    .optional(),
});

export async function PATCH(request: NextRequest) {
  const sesjon = await hentSesjon();
  if (!sesjon || sesjon.rolle !== "PARORENDE") {
    return NextResponse.json({ feil: "Ikke innlogget." }, { status: 401 });
  }

  const parsing = kropp.safeParse(await request.json());
  if (!parsing.success) {
    return NextResponse.json({ feil: "Ugyldige data." }, { status: 400 });
  }

  const parorende = await prisma.bruker.findUnique({
    where: { id: sesjon.brukerId },
  });
  if (!parorende) {
    return NextResponse.json({ feil: "Fant ikke bruker." }, { status: 404 });
  }

  if (parsing.data.sjekkinnFrist) {
    await prisma.innstilling.update({
      where: { familieId: parorende.familieId },
      data: { sjekkinnFrist: parsing.data.sjekkinnFrist },
    });
  }

  if (parsing.data.tilgang) {
    for (const { brukerId, harTilgang } of parsing.data.tilgang) {
      const mal = await prisma.bruker.findUnique({ where: { id: brukerId } });
      if (!mal || mal.familieId !== parorende.familieId || mal.rolle !== ROLLE.PARORENDE) {
        continue;
      }
      await prisma.bruker.update({
        where: { id: brukerId },
        data: { harTilgang },
      });
    }
  }

  return NextResponse.json({ ok: true });
}
