import { PrismaClient } from "@prisma/client";
import { hashPassord, hashPin } from "../src/lib/auth";

const prisma = new PrismaClient();

async function main() {
  await prisma.bestilling.deleteMany();
  await prisma.hjelpeforesporsel.deleteMany();
  await prisma.medisinBekreftelse.deleteMany();
  await prisma.innsjekk.deleteMany();
  await prisma.samtykke.deleteMany();
  await prisma.innstilling.deleteMany();
  await prisma.bruker.deleteMany();
  await prisma.familie.deleteMany();

  const familie = await prisma.familie.create({
    data: {
      navn: "Familien Hansen",
      innstilling: {
        create: { sjekkinnFrist: "11:00" },
      },
    },
  });

  const astrid = await prisma.bruker.create({
    data: {
      navn: "Astrid Hansen",
      rolle: "SENIOR",
      familieId: familie.id,
      pinHash: await hashPin("1234"),
      samtykke: {
        create: { gitt: true },
      },
    },
  });

  const kari = await prisma.bruker.create({
    data: {
      navn: "Kari Hansen",
      rolle: "PARORENDE",
      familieId: familie.id,
      epost: "kari@eksempel.no",
      passordHash: await hashPassord("Passord123"),
    },
  });

  await prisma.bruker.create({
    data: {
      navn: "Ola Hansen",
      rolle: "PARORENDE",
      familieId: familie.id,
      epost: "ola@eksempel.no",
      passordHash: await hashPassord("Passord123"),
    },
  });

  const igar = new Date();
  igar.setDate(igar.getDate() - 1);
  igar.setHours(9, 15, 0, 0);

  await prisma.innsjekk.create({
    data: { brukerId: astrid.id, tidspunkt: igar },
  });
  await prisma.medisinBekreftelse.create({
    data: { brukerId: astrid.id, tidspunkt: igar },
  });

  const digitalForesporsel = await prisma.hjelpeforesporsel.create({
    data: {
      brukerId: astrid.id,
      type: "DIGITAL",
      status: "NY",
    },
  });
  await prisma.bestilling.create({
    data: {
      familieId: familie.id,
      bestiltAvId: kari.id,
      foresporselId: digitalForesporsel.id,
      tjeneste: "DIGITAL_HJELP",
      timeprisOre: 59500,
      status: "NY",
    },
  });

  await prisma.hjelpeforesporsel.create({
    data: {
      brukerId: astrid.id,
      type: "PRAKTISK",
      status: "FERDIG",
    },
  });

  console.log("Seed fullført:");
  console.log("  Senior-PIN (Astrid Hansen): 1234");
  console.log("  Pårørende-innlogging: kari@eksempel.no / Passord123");
  console.log("  Pårørende-innlogging: ola@eksempel.no / Passord123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
