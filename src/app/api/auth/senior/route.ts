import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { sjekkPin } from "@/lib/auth";
import { settSesjon } from "@/lib/sesjon";
import { ROLLE } from "@/lib/typer";

const kropp = z.object({
  pin: z.string().length(4),
});

export async function POST(request: NextRequest) {
  const parsing = kropp.safeParse(await request.json());
  if (!parsing.success) {
    return NextResponse.json({ feil: "Ugyldig PIN-format." }, { status: 400 });
  }

  const seniorer = await prisma.bruker.findMany({
    where: { rolle: ROLLE.SENIOR },
  });

  for (const senior of seniorer) {
    if (senior.pinHash && (await sjekkPin(parsing.data.pin, senior.pinHash))) {
      await settSesjon({ brukerId: senior.id, rolle: "SENIOR" });

      const samtykke = await prisma.samtykke.findUnique({
        where: { brukerId: senior.id },
      });
      const trengerSamtykke = !samtykke || !samtykke.gitt || samtykke.trukket;

      return NextResponse.json({ ok: true, trengerSamtykke });
    }
  }

  return NextResponse.json({ feil: "Feil PIN-kode." }, { status: 401 });
}
