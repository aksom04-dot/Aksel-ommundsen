import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { sjekkPassord } from "@/lib/auth";
import { settSesjon } from "@/lib/sesjon";

const kropp = z.object({
  epost: z.string().email(),
  passord: z.string().min(1),
});

export async function POST(request: NextRequest) {
  const parsing = kropp.safeParse(await request.json());
  if (!parsing.success) {
    return NextResponse.json(
      { feil: "Fyll ut e-post og passord." },
      { status: 400 },
    );
  }

  const bruker = await prisma.bruker.findUnique({
    where: { epost: parsing.data.epost },
  });

  if (
    !bruker ||
    !bruker.passordHash ||
    !(await sjekkPassord(parsing.data.passord, bruker.passordHash))
  ) {
    return NextResponse.json(
      { feil: "Feil e-post eller passord." },
      { status: 401 },
    );
  }

  await settSesjon({ brukerId: bruker.id, rolle: "PARORENDE" });
  return NextResponse.json({ ok: true });
}
