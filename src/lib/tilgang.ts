import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { hentSesjon } from "@/lib/sesjon";

export async function krevSeniorBruker() {
  const sesjon = await hentSesjon();
  if (!sesjon || sesjon.rolle !== "SENIOR") {
    redirect("/senior/login");
  }

  const bruker = await prisma.bruker.findUnique({
    where: { id: sesjon.brukerId },
    include: { samtykke: true },
  });

  if (!bruker) {
    redirect("/senior/login");
  }

  const samtykke = bruker.samtykke;
  if (!samtykke || !samtykke.gitt || samtykke.trukket) {
    redirect("/samtykke");
  }

  return bruker;
}

export async function krevParorendeBruker() {
  const sesjon = await hentSesjon();
  if (!sesjon || sesjon.rolle !== "PARORENDE") {
    redirect("/parorende/login");
  }

  const bruker = await prisma.bruker.findUnique({
    where: { id: sesjon.brukerId },
    include: { familie: true },
  });

  if (!bruker) {
    redirect("/parorende/login");
  }

  return bruker;
}
