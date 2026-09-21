"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SamtykkeSkjema({
  harGittSamtykke,
}: {
  harGittSamtykke: boolean;
}) {
  const router = useRouter();
  const [visBekreftSletting, setVisBekreftSletting] = useState(false);
  const [laster, setLaster] = useState(false);

  async function godta() {
    setLaster(true);
    try {
      const res = await fetch("/api/samtykke", { method: "POST" });
      if (res.ok) router.push("/senior");
    } finally {
      setLaster(false);
    }
  }

  async function trekkOgSlett() {
    setLaster(true);
    try {
      const res = await fetch("/api/samtykke", { method: "DELETE" });
      if (res.ok) router.push("/");
    } finally {
      setLaster(false);
    }
  }

  return (
    <div className="flex w-full max-w-lg flex-col gap-6">
      <h1 className="text-center text-3xl font-bold text-marine-900">
        Personvern
      </h1>

      <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 text-lg leading-relaxed text-marine-900 shadow-sm">
        <div>
          <p className="font-semibold">Dette deler vi med familien din:</p>
          <ul className="ml-5 list-disc">
            <li>Om du har trykket &quot;Jeg har det bra i dag&quot;</li>
            <li>Om du har bekreftet at du har tatt medisinene</li>
            <li>Om du ber om hjelp, og hvilken type hjelp</li>
          </ul>
        </div>
        <div>
          <p className="font-semibold">Dette deler vi aldri:</p>
          <ul className="ml-5 list-disc">
            <li>Hvilke medisiner du tar</li>
            <li>Diagnoser eller annen helseinformasjon</li>
          </ul>
        </div>
        <p>
          Du bestemmer selv. Du kan når som helst trekke tilbake samtykket og
          slette all data om deg i appen.
        </p>
      </div>

      {!harGittSamtykke && (
        <button
          type="button"
          disabled={laster}
          onClick={godta}
          className="flex min-h-knapp items-center justify-center rounded-2xl bg-marine-700 px-6 text-center text-senior-lg font-bold text-white shadow-md transition hover:bg-marine-500 disabled:opacity-50"
        >
          Jeg godtar
        </button>
      )}

      {harGittSamtykke && !visBekreftSletting && (
        <div className="flex flex-col gap-4">
          <p className="rounded-xl bg-status-gronn-bg px-4 py-3 text-center font-semibold text-status-gronn-tekst">
            Du har godtatt deling av denne informasjonen.
          </p>
          <button
            type="button"
            onClick={() => router.push("/senior")}
            className="flex min-h-[64px] items-center justify-center rounded-2xl bg-marine-700 px-6 text-center text-lg font-bold text-white shadow-md transition hover:bg-marine-500"
          >
            Tilbake
          </button>
          <button
            type="button"
            onClick={() => setVisBekreftSletting(true)}
            className="flex min-h-[64px] items-center justify-center rounded-2xl border-2 border-status-rod-tekst bg-white px-6 text-center text-lg font-semibold text-status-rod-tekst shadow-sm transition hover:bg-status-rod-bg"
          >
            Trekk samtykke og slett all data
          </button>
        </div>
      )}

      {harGittSamtykke && visBekreftSletting && (
        <div className="flex flex-col gap-4 rounded-2xl border-2 border-status-rod-tekst bg-status-rod-bg p-6">
          <p className="text-center text-lg font-semibold text-status-rod-tekst">
            Er du sikker? All data om deg blir slettet for godt, og familien
            din mister tilgangen til appen din.
          </p>
          <button
            type="button"
            disabled={laster}
            onClick={trekkOgSlett}
            className="flex min-h-[64px] items-center justify-center rounded-2xl bg-status-rod-tekst px-6 text-center text-lg font-bold text-white shadow-md transition disabled:opacity-50"
          >
            Ja, slett alt
          </button>
          <button
            type="button"
            disabled={laster}
            onClick={() => setVisBekreftSletting(false)}
            className="flex min-h-[64px] items-center justify-center rounded-2xl bg-white px-6 text-center text-lg font-semibold text-marine-900 shadow-sm transition hover:bg-marine-100"
          >
            Avbryt
          </button>
        </div>
      )}
    </div>
  );
}
