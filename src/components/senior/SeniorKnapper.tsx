"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  harSjekketInnIDag: boolean;
  harBekreftetMedisinIDag: boolean;
}

export default function SeniorKnapper({
  harSjekketInnIDag,
  harBekreftetMedisinIDag,
}: Props) {
  const router = useRouter();
  const [innsjekket, setInnsjekket] = useState(harSjekketInnIDag);
  const [medisinBekreftet, setMedisinBekreftet] = useState(
    harBekreftetMedisinIDag,
  );
  const [melding, setMelding] = useState<string | null>(null);
  const [laster, setLaster] = useState(false);

  async function sjekkInn() {
    setLaster(true);
    setMelding(null);
    try {
      const res = await fetch("/api/checkin", { method: "POST" });
      if (res.ok) {
        setInnsjekket(true);
        setMelding("Bra! Familien din har fått beskjed om at du har det bra i dag.");
      } else {
        setMelding("Noe gikk galt. Prøv igjen.");
      }
    } finally {
      setLaster(false);
    }
  }

  async function bekreftMedisin() {
    setLaster(true);
    setMelding(null);
    try {
      const res = await fetch("/api/medisin", { method: "POST" });
      if (res.ok) {
        setMedisinBekreftet(true);
        setMelding("Flott! Medisinene dine er bekreftet for i dag.");
      } else {
        setMelding("Noe gikk galt. Prøv igjen.");
      }
    } finally {
      setLaster(false);
    }
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <button
        type="button"
        onClick={sjekkInn}
        disabled={laster || innsjekket}
        aria-pressed={innsjekket}
        className="flex min-h-[120px] flex-col items-center justify-center gap-1 rounded-2xl bg-marine-700 px-6 text-center text-senior-lg font-bold text-white shadow-md transition hover:bg-marine-500 disabled:cursor-default disabled:bg-status-gronn-tekst disabled:opacity-100"
      >
        {innsjekket ? "✓ Du har sjekket inn i dag" : "Jeg har det bra i dag"}
      </button>

      <button
        type="button"
        onClick={bekreftMedisin}
        disabled={laster || medisinBekreftet}
        aria-pressed={medisinBekreftet}
        className="flex min-h-[120px] flex-col items-center justify-center gap-1 rounded-2xl bg-marine-700 px-6 text-center text-senior-lg font-bold text-white shadow-md transition hover:bg-marine-500 disabled:cursor-default disabled:bg-status-gronn-tekst disabled:opacity-100"
      >
        {medisinBekreftet
          ? "✓ Medisiner bekreftet i dag"
          : "Jeg har tatt medisinene"}
      </button>

      <button
        type="button"
        onClick={() => router.push("/senior/hjelp")}
        disabled={laster}
        className="flex min-h-[120px] flex-col items-center justify-center gap-1 rounded-2xl border-4 border-gul-500 bg-white px-6 text-center text-senior-lg font-bold text-marine-900 shadow-md transition hover:bg-gul-100"
      >
        Jeg trenger hjelp
      </button>

      {melding && (
        <p
          role="status"
          className="rounded-xl bg-status-gronn-bg px-4 py-3 text-center text-lg font-semibold text-status-gronn-tekst"
        >
          {melding}
        </p>
      )}
    </div>
  );
}
