import Link from "next/link";
import { krevSeniorBruker } from "@/lib/tilgang";
import { prisma } from "@/lib/db";
import SeniorKnapper from "@/components/senior/SeniorKnapper";

function erSammeDag(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default async function SeniorPage() {
  const bruker = await krevSeniorBruker();
  const naa = new Date();

  const [sisteInnsjekk, sisteMedisin] = await Promise.all([
    prisma.innsjekk.findFirst({
      where: { brukerId: bruker.id },
      orderBy: { tidspunkt: "desc" },
    }),
    prisma.medisinBekreftelse.findFirst({
      where: { brukerId: bruker.id },
      orderBy: { tidspunkt: "desc" },
    }),
  ]);

  const harSjekketInnIDag = !!sisteInnsjekk && erSammeDag(sisteInnsjekk.tidspunkt, naa);
  const harBekreftetMedisinIDag =
    !!sisteMedisin && erSammeDag(sisteMedisin.tidspunkt, naa);

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-6">
      <h1 className="mt-4 text-center text-3xl font-bold text-marine-900">
        Hei, {bruker.navn.split(" ")[0]}!
      </h1>
      <SeniorKnapper
        harSjekketInnIDag={harSjekketInnIDag}
        harBekreftetMedisinIDag={harBekreftetMedisinIDag}
      />
      <Link href="/samtykke" className="mt-4 text-base text-graa-600 underline">
        Personvern og mine data
      </Link>
    </main>
  );
}
