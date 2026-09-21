"use client";

import { useState, type FormEvent } from "react";

interface Pårørende {
  id: string;
  navn: string;
  harTilgang: boolean;
}

export default function InnstillingerSkjema({
  sjekkinnFrist,
  pårørende,
}: {
  sjekkinnFrist: string;
  pårørende: Pårørende[];
}) {
  const [frist, setFrist] = useState(sjekkinnFrist);
  const [tilgang, setTilgang] = useState(
    Object.fromEntries(pårørende.map((p) => [p.id, p.harTilgang])),
  );
  const [lagret, setLagret] = useState(false);
  const [laster, setLaster] = useState(false);

  async function lagre(e: FormEvent) {
    e.preventDefault();
    setLaster(true);
    setLagret(false);
    try {
      const res = await fetch("/api/innstillinger", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sjekkinnFrist: frist,
          tilgang: pårørende.map((p) => ({
            brukerId: p.id,
            harTilgang: tilgang[p.id],
          })),
        }),
      });
      if (res.ok) setLagret(true);
    } finally {
      setLaster(false);
    }
  }

  return (
    <form onSubmit={lagre} className="flex flex-col gap-6">
      <label className="flex flex-col gap-1">
        <span className="font-medium text-marine-900">
          Frist for daglig innsjekk
        </span>
        <input
          type="time"
          lang="nb-NO"
          value={frist}
          onChange={(e) => setFrist(e.target.value)}
          className="w-40 rounded-xl border-2 border-marine-100 px-4 py-2 text-lg focus:border-marine-700 focus:outline-none"
        />
      </label>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-1 font-medium text-marine-900">
          Hvem får se data om innsjekk og hjelpeforespørsler
        </legend>
        {pårørende.map((p) => (
          <label key={p.id} className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={tilgang[p.id]}
              onChange={(e) =>
                setTilgang((t) => ({ ...t, [p.id]: e.target.checked }))
              }
              className="h-5 w-5"
            />
            <span>{p.navn}</span>
          </label>
        ))}
      </fieldset>

      <button
        type="submit"
        disabled={laster}
        className="w-fit rounded-xl bg-marine-700 px-6 py-3 font-semibold text-white transition hover:bg-marine-500 disabled:opacity-50"
      >
        {laster ? "Lagrer…" : "Lagre"}
      </button>

      {lagret && (
        <p role="status" className="text-status-gronn-tekst">
          Innstillinger lagret.
        </p>
      )}
    </form>
  );
}
