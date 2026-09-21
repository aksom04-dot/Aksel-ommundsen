"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  HJELPE_TYPE_TEKST,
  type ForesporselStatus,
  type HjelpeType,
} from "@/lib/typer";

export interface ForesporselRad {
  id: string;
  navn: string;
  type: HjelpeType;
  status: ForesporselStatus;
  opprettet: string;
}

const STATUS_TEKST: Record<ForesporselStatus, string> = {
  NY: "Ny",
  TATT: "Tatt",
  FERDIG: "Ferdig",
};

const NESTE_STATUS: Record<ForesporselStatus, ForesporselStatus | null> = {
  NY: "TATT",
  TATT: "FERDIG",
  FERDIG: null,
};

export default function ForesporselListe({
  forespørsler,
}: {
  forespørsler: ForesporselRad[];
}) {
  const router = useRouter();
  const [oppdaterer, setOppdaterer] = useState<string | null>(null);

  async function oppdaterStatus(id: string, nyStatus: ForesporselStatus) {
    setOppdaterer(id);
    try {
      const res = await fetch(`/api/foresporsler/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nyStatus }),
      });
      if (res.ok) router.refresh();
    } finally {
      setOppdaterer(null);
    }
  }

  if (forespørsler.length === 0) {
    return (
      <p className="text-graa-600">Ingen hjelpeforespørsler foreløpig.</p>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {forespørsler.map((f) => {
        const neste = NESTE_STATUS[f.status];
        return (
          <li
            key={f.id}
            className="flex flex-col gap-2 rounded-xl border border-marine-100 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-semibold text-marine-900">
                {f.navn} — {HJELPE_TYPE_TEKST[f.type]}
              </p>
              <p className="text-sm text-graa-600">
                {new Date(f.opprettet).toLocaleString("nb-NO")}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-marine-100 px-3 py-1 text-sm font-medium text-marine-900">
                {STATUS_TEKST[f.status]}
              </span>
              {neste && (
                <button
                  type="button"
                  disabled={oppdaterer === f.id}
                  onClick={() => oppdaterStatus(f.id, neste)}
                  className="rounded-lg bg-marine-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-marine-500 disabled:opacity-50"
                >
                  Merk som {STATUS_TEKST[neste].toLowerCase()}
                </button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
