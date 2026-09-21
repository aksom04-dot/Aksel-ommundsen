"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { TJENESTE, TJENESTE_TIMEPRIS_ORE, type Tjeneste } from "@/lib/typer";

const TJENESTE_TEKST: Record<Tjeneste, string> = {
  DIGITAL_HJELP: "Digital hjelp",
  PRAKTISK_HJELP: "Praktisk hjelp",
};

function kroner(ore: number): string {
  return `${Math.round(ore / 100)} kr/t`;
}

export default function BestillHjelp() {
  const router = useRouter();
  const [aapen, setAapen] = useState(false);
  const [laster, setLaster] = useState(false);
  const [kvittering, setKvittering] = useState<string | null>(null);

  async function bestill(tjeneste: Tjeneste) {
    setLaster(true);
    try {
      const res = await fetch("/api/bestill-hjelp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tjeneste }),
      });
      if (res.ok) {
        setKvittering(
          `${TJENESTE_TEKST[tjeneste]} er bestilt (${kroner(TJENESTE_TIMEPRIS_ORE[tjeneste])}).`,
        );
        setAapen(false);
        router.refresh();
      }
    } finally {
      setLaster(false);
    }
  }

  if (!aapen) {
    return (
      <div className="flex flex-col gap-2">
        <button
          type="button"
          onClick={() => {
            setAapen(true);
            setKvittering(null);
          }}
          className="rounded-xl bg-gul-500 px-5 py-3 font-semibold text-marine-900 shadow-sm transition hover:brightness-95"
        >
          Bestill hjelp
        </button>
        {kvittering && (
          <p role="status" className="text-sm text-status-gronn-tekst">
            {kvittering}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-marine-100 bg-white p-4">
      <p className="font-semibold text-marine-900">Velg tjeneste</p>
      {(Object.keys(TJENESTE) as Tjeneste[]).map((tjeneste) => (
        <button
          key={tjeneste}
          type="button"
          disabled={laster}
          onClick={() => bestill(tjeneste)}
          className="flex items-center justify-between rounded-lg bg-marine-700 px-4 py-3 text-left text-white transition hover:bg-marine-500 disabled:opacity-50"
        >
          <span>{TJENESTE_TEKST[tjeneste]}</span>
          <span>{kroner(TJENESTE_TIMEPRIS_ORE[tjeneste])}</span>
        </button>
      ))}
      <button
        type="button"
        onClick={() => setAapen(false)}
        className="text-sm font-medium text-graa-600 underline"
      >
        Avbryt
      </button>
    </div>
  );
}
