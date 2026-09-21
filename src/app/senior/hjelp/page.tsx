import { krevSeniorBruker } from "@/lib/tilgang";
import HjelpValg from "@/components/senior/HjelpValg";

export default async function SeniorHjelpPage() {
  await krevSeniorBruker();

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-6">
      <h1 className="mt-4 text-center text-3xl font-bold text-marine-900">
        Hva trenger du hjelp med?
      </h1>
      <HjelpValg />
    </main>
  );
}
