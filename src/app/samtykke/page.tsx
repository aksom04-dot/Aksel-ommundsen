import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { hentSesjon } from "@/lib/sesjon";
import SamtykkeSkjema from "@/components/senior/SamtykkeSkjema";

export default async function SamtykkePage() {
  const sesjon = await hentSesjon();
  if (!sesjon || sesjon.rolle !== "SENIOR") {
    redirect("/senior/login");
  }

  const bruker = await prisma.bruker.findUnique({
    where: { id: sesjon.brukerId },
    include: { samtykke: true },
  });
  if (!bruker) {
    redirect("/senior/login");
  }

  const harGittSamtykke = !!bruker.samtykke?.gitt && !bruker.samtykke.trukket;

  return (
    <main className="flex min-h-screen flex-col items-center gap-6 p-6">
      <SamtykkeSkjema harGittSamtykke={harGittSamtykke} />
    </main>
  );
}
