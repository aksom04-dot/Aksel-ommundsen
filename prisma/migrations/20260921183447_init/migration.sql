-- CreateTable
CREATE TABLE "Familie" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "navn" TEXT NOT NULL,
    "opprettet" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Bruker" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "navn" TEXT NOT NULL,
    "rolle" TEXT NOT NULL,
    "familieId" TEXT NOT NULL,
    "pinHash" TEXT,
    "epost" TEXT,
    "passordHash" TEXT,
    "harTilgang" BOOLEAN NOT NULL DEFAULT true,
    "opprettet" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Bruker_familieId_fkey" FOREIGN KEY ("familieId") REFERENCES "Familie" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Innsjekk" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "brukerId" TEXT NOT NULL,
    "tidspunkt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Innsjekk_brukerId_fkey" FOREIGN KEY ("brukerId") REFERENCES "Bruker" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MedisinBekreftelse" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "brukerId" TEXT NOT NULL,
    "tidspunkt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "MedisinBekreftelse_brukerId_fkey" FOREIGN KEY ("brukerId") REFERENCES "Bruker" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Hjelpeforesporsel" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "brukerId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NY',
    "opprettet" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "oppdatert" DATETIME NOT NULL,
    CONSTRAINT "Hjelpeforesporsel_brukerId_fkey" FOREIGN KEY ("brukerId") REFERENCES "Bruker" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Bestilling" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "foresporselId" TEXT NOT NULL,
    "tjeneste" TEXT NOT NULL,
    "timeprisOre" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NY',
    "opprettet" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Bestilling_foresporselId_fkey" FOREIGN KEY ("foresporselId") REFERENCES "Hjelpeforesporsel" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Samtykke" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "brukerId" TEXT NOT NULL,
    "gitt" BOOLEAN NOT NULL DEFAULT false,
    "tidspunkt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "trukket" BOOLEAN NOT NULL DEFAULT false,
    "trukketTidspunkt" DATETIME,
    CONSTRAINT "Samtykke_brukerId_fkey" FOREIGN KEY ("brukerId") REFERENCES "Bruker" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Innstilling" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "familieId" TEXT NOT NULL,
    "sjekkinnFrist" TEXT NOT NULL DEFAULT '11:00',
    CONSTRAINT "Innstilling_familieId_fkey" FOREIGN KEY ("familieId") REFERENCES "Familie" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Bruker_epost_key" ON "Bruker"("epost");

-- CreateIndex
CREATE INDEX "Innsjekk_brukerId_tidspunkt_idx" ON "Innsjekk"("brukerId", "tidspunkt");

-- CreateIndex
CREATE INDEX "MedisinBekreftelse_brukerId_tidspunkt_idx" ON "MedisinBekreftelse"("brukerId", "tidspunkt");

-- CreateIndex
CREATE UNIQUE INDEX "Bestilling_foresporselId_key" ON "Bestilling"("foresporselId");

-- CreateIndex
CREATE UNIQUE INDEX "Samtykke_brukerId_key" ON "Samtykke"("brukerId");

-- CreateIndex
CREATE UNIQUE INDEX "Innstilling_familieId_key" ON "Innstilling"("familieId");
