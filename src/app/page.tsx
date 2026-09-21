import Link from "next/link";

export default function VelgRollePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-6">
      <h1 className="text-center text-3xl font-bold text-marine-900">
        Trygg Hjemme
      </h1>
      <p className="text-center text-lg text-graa-600">Hvem er du?</p>
      <div className="flex w-full max-w-sm flex-col gap-4">
        <Link
          href="/senior/login"
          className="flex min-h-knapp items-center justify-center rounded-2xl bg-marine-700 px-6 text-center text-senior-lg font-semibold text-white shadow-md transition hover:bg-marine-500"
        >
          Jeg er senior
        </Link>
        <Link
          href="/parorende/login"
          className="flex min-h-[64px] items-center justify-center rounded-2xl border-2 border-marine-700 bg-white px-6 text-center text-lg font-semibold text-marine-700 shadow-sm transition hover:bg-marine-100"
        >
          Jeg er pårørende
        </Link>
      </div>
    </main>
  );
}
