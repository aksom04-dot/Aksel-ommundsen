"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SeniorLoginPage() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [feilmelding, setFeilmelding] = useState<string | null>(null);
  const [laster, setLaster] = useState(false);

  function leggTilSiffer(siffer: string) {
    if (pin.length >= 4) return;
    setFeilmelding(null);
    const nyPin = pin + siffer;
    setPin(nyPin);
    if (nyPin.length === 4) {
      sendInn(nyPin);
    }
  }

  function slettSiffer() {
    setFeilmelding(null);
    setPin((p) => p.slice(0, -1));
  }

  async function sendInn(fullPin: string) {
    setLaster(true);
    try {
      const res = await fetch("/api/auth/senior", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: fullPin }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFeilmelding(data.feil ?? "Noe gikk galt. Prøv igjen.");
        setPin("");
        return;
      }
      router.push(data.trengerSamtykke ? "/samtykke" : "/senior");
    } catch {
      setFeilmelding("Kunne ikke koble til. Prøv igjen.");
      setPin("");
    } finally {
      setLaster(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-6">
      <h1 className="text-center text-3xl font-bold text-marine-900">
        Skriv inn din kode
      </h1>

      <div
        className="flex gap-4"
        role="status"
        aria-label={`${pin.length} av 4 sifre fylt inn`}
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-8 w-8 rounded-full border-4 border-marine-700 ${
              i < pin.length ? "bg-marine-700" : "bg-white"
            }`}
          />
        ))}
      </div>

      {feilmelding && (
        <p
          role="alert"
          className="rounded-xl bg-status-rod-bg px-4 py-3 text-center text-lg font-semibold text-status-rod-tekst"
        >
          {feilmelding}
        </p>
      )}

      <div className="grid w-full max-w-xs grid-cols-3 gap-4">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((siffer) => (
          <button
            key={siffer}
            type="button"
            disabled={laster}
            onClick={() => leggTilSiffer(siffer)}
            className="min-h-knapp rounded-2xl bg-white text-senior-lg font-bold text-marine-900 shadow-md transition hover:bg-marine-100 disabled:opacity-50"
          >
            {siffer}
          </button>
        ))}
        <button
          type="button"
          disabled={laster}
          onClick={slettSiffer}
          className="min-h-knapp rounded-2xl bg-white text-lg font-semibold text-marine-900 shadow-md transition hover:bg-marine-100 disabled:opacity-50"
        >
          Slett
        </button>
        <button
          type="button"
          disabled={laster}
          onClick={() => leggTilSiffer("0")}
          className="min-h-knapp rounded-2xl bg-white text-senior-lg font-bold text-marine-900 shadow-md transition hover:bg-marine-100 disabled:opacity-50"
        >
          0
        </button>
      </div>
    </main>
  );
}
