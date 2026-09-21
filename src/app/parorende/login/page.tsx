"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function ParorendeLoginPage() {
  const router = useRouter();
  const [epost, setEpost] = useState("");
  const [passord, setPassord] = useState("");
  const [feilmelding, setFeilmelding] = useState<string | null>(null);
  const [laster, setLaster] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLaster(true);
    setFeilmelding(null);
    try {
      const res = await fetch("/api/auth/parorende", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ epost, passord }),
      });
      const data = await res.json();
      if (!res.ok) {
        setFeilmelding(data.feil ?? "Noe gikk galt. Prøv igjen.");
        return;
      }
      router.push("/parorende/dashboard");
    } catch {
      setFeilmelding("Kunne ikke koble til. Prøv igjen.");
    } finally {
      setLaster(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-center text-2xl font-bold text-marine-900">
        Logg inn som pårørende
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-4"
      >
        <label className="flex flex-col gap-1">
          <span className="font-medium text-marine-900">E-post</span>
          <input
            type="email"
            required
            value={epost}
            onChange={(e) => setEpost(e.target.value)}
            className="rounded-xl border-2 border-marine-100 px-4 py-3 text-lg focus:border-marine-700 focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="font-medium text-marine-900">Passord</span>
          <input
            type="password"
            required
            value={passord}
            onChange={(e) => setPassord(e.target.value)}
            className="rounded-xl border-2 border-marine-100 px-4 py-3 text-lg focus:border-marine-700 focus:outline-none"
          />
        </label>

        {feilmelding && (
          <p role="alert" className="text-status-rod-tekst">
            {feilmelding}
          </p>
        )}

        <button
          type="submit"
          disabled={laster}
          className="mt-2 rounded-xl bg-marine-700 px-6 py-3 text-lg font-semibold text-white transition hover:bg-marine-500 disabled:opacity-50"
        >
          {laster ? "Logger inn…" : "Logg inn"}
        </button>
      </form>
    </main>
  );
}
