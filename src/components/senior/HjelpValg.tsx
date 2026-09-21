"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { HJELPE_TYPE, HJELPE_TYPE_TEKST, type HjelpeType } from "@/lib/typer";

export default function HjelpValg() {
  const router = useRouter();
  const [sendt, setSendt] = useState<HjelpeType | null>(null);
  const [laster, setLaster] = useState(false);

  async function velg(type: HjelpeType) {
    setLaster(true);
    try {
      const res = await fetch("/api/hjelp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type }),
      });
      if (res.ok) {
        setSendt(type);
      }
    } finally {
      setLaster(false);
    }
  }

  if (sendt) {
    return (
      <div className="flex w-full max-w-md flex-col gap-6">
        <p
          role="status"
          className="rounded-2xl bg-status-gronn-bg px-6 py-8 text-center text-senior-lg font-bold text-status-gronn-tekst"
        >
          Beskjed sendt! Familien din vet nå at du trenger: {HJELPE_TYPE_TEKST[sendt]}
        </p>
        <button
          type="button"
          onClick={() => router.push("/senior")}
          className="flex min-h-knapp items-center justify-center rounded-2xl bg-marine-700 px-6 text-center text-senior-lg font-bold text-white shadow-md transition hover:bg-marine-500"
        >
          Tilbake
        </button>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      {(Object.keys(HJELPE_TYPE) as HjelpeType[]).map((type) => (
        <button
          key={type}
          type="button"
          disabled={laster}
          onClick={() => velg(type)}
          className="flex min-h-knapp items-center justify-center rounded-2xl bg-marine-700 px-6 text-center text-senior-lg font-bold text-white shadow-md transition hover:bg-marine-500 disabled:opacity-50"
        >
          {HJELPE_TYPE_TEKST[type]}
        </button>
      ))}
      <button
        type="button"
        onClick={() => router.push("/senior")}
        className="flex min-h-[64px] items-center justify-center rounded-2xl border-2 border-marine-700 bg-white px-6 text-center text-lg font-semibold text-marine-700 shadow-sm transition hover:bg-marine-100"
      >
        Avbryt
      </button>
    </div>
  );
}
