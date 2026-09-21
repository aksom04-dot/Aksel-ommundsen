import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hentSesjon } from "@/lib/sesjon";

function erSammeDag(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export async function POST() {
  const sesjon = await hentSesjon();
  if (!sesjon || sesjon.rolle !== "SENIOR") {
    return NextResponse.json({ feil: "Ikke innlogget." }, { status: 401 });
  }

  const naa = new Date();
  const sisteIDag = await prisma.medisinBekreftelse.findFirst({
    where: { brukerId: sesjon.brukerId },
    orderBy: { tidspunkt: "desc" },
  });

  if (sisteIDag && erSammeDag(sisteIDag.tidspunkt, naa)) {
    return NextResponse.json({ ok: true, allerede: true });
  }

  await prisma.medisinBekreftelse.create({
    data: { brukerId: sesjon.brukerId },
  });
  return NextResponse.json({ ok: true });
}
