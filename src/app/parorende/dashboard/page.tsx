import Link from "next/link";
import { krevParorendeBruker } from "@/lib/tilgang";
import { prisma } from "@/lib/db";
import { beregnInnsjekkStatus } from "@/lib/status";
import StatusLys from "@/components/dashboard/StatusLys";
import ForesporselListe, {
  type ForesporselRad,
} from "@/components/dashboard/ForesporselListe";
import BestillHjelp from "@/components/dashboard/BestillHjelp";
import LoggUtKnapp from "@/components/dashboard/LoggUtKnapp";
import { ROLLE, type ForesporselStatus, type HjelpeType } from "@/lib/typer";

export default async function DashboardPage() {
  const parorende = await krevParorendeBruker();

  if (!parorende.harTilgang) {
    return (
      <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-4 p-6 text-center">
        <h1 className="text-2xl font-bold text-marine-900">
          Du har ikke tilgang til familiens data
        </h1>
        <p className="text-graa-600">
          En annen pårørende har fjernet din tilgang i innstillingene. Ta
          kontakt med familien om du mener dette er feil.
        </p>
        <LoggUtKnapp />
      </main>
    );
  }

  const [seniorer, innstilling, forespørsler] = await Promise.all([
    prisma.bruker.findMany({
      where: { familieId: parorende.familieId, rolle: ROLLE.SENIOR },
      include: {
        innsjekk: { orderBy: { tidspunkt: "desc" }, take: 1 },
      },
    }),
    prisma.innstilling.findUnique({
      where: { familieId: parorende.familieId },
    }),
    prisma.hjelpeforesporsel.findMany({
      where: { bruker: { familieId: parorende.familieId } },
      include: { bruker: true },
      orderBy: { opprettet: "desc" },
    }),
  ]);

  const frist = innstilling?.sjekkinnFrist ?? "11:00";
  const naa = new Date();

  const foresporselRader: ForesporselRad[] = forespørsler.map((f) => ({
    id: f.id,
    navn: f.bruker.navn,
    type: f.type as HjelpeType,
    status: f.status as ForesporselStatus,
    opprettet: f.opprettet.toISOString(),
  }));

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-8 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-marine-900">
          Hei, {parorende.navn.split(" ")[0]}
        </h1>
        <div className="flex items-center gap-4">
          <Link
            href="/parorende/innstillinger"
            className="text-sm font-medium text-marine-700 underline"
          >
            Innstillinger
          </Link>
          <LoggUtKnapp />
        </div>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-marine-900">
          Dagens status
        </h2>
        {seniorer.length === 0 && (
          <p className="text-graa-600">Ingen senior er koblet til familien ennå.</p>
        )}
        {seniorer.map((senior) => {
          const status = beregnInnsjekkStatus(
            senior.innsjekk[0]?.tidspunkt ?? null,
            naa,
            frist,
          );
          return <StatusLys key={senior.id} navn={senior.navn} status={status} />;
        })}
        <p className="text-sm text-graa-600">Innsjekkfrist: kl. {frist}</p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-marine-900">
          Hjelpeforespørsler
        </h2>
        <ForesporselListe forespørsler={foresporselRader} />
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-marine-900">Bestill hjelp</h2>
        <BestillHjelp />
      </section>
    </main>
  );
}
