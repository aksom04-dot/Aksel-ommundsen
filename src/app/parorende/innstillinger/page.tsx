import Link from "next/link";
import { krevParorendeBruker } from "@/lib/tilgang";
import { prisma } from "@/lib/db";
import { ROLLE } from "@/lib/typer";
import InnstillingerSkjema from "@/components/dashboard/InnstillingerSkjema";

export default async function InnstillingerPage() {
  const parorende = await krevParorendeBruker();

  const [innstilling, pårørende] = await Promise.all([
    prisma.innstilling.findUnique({
      where: { familieId: parorende.familieId },
    }),
    prisma.bruker.findMany({
      where: { familieId: parorende.familieId, rolle: ROLLE.PARORENDE },
      select: { id: true, navn: true, harTilgang: true },
    }),
  ]);

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col gap-6 p-6">
      <Link href="/parorende/dashboard" className="text-sm font-medium text-marine-700 underline">
        ← Tilbake til dashboard
      </Link>
      <h1 className="text-2xl font-bold text-marine-900">Innstillinger</h1>
      <InnstillingerSkjema
        sjekkinnFrist={innstilling?.sjekkinnFrist ?? "11:00"}
        pårørende={pårørende}
      />
    </main>
  );
}
