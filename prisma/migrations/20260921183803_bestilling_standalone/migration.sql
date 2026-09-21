/*
  Warnings:

  - Added the required column `bestiltAvId` to the `Bestilling` table without a default value. This is not possible if the table is not empty.
  - Added the required column `familieId` to the `Bestilling` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bestilling" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "familieId" TEXT NOT NULL,
    "bestiltAvId" TEXT NOT NULL,
    "foresporselId" TEXT,
    "tjeneste" TEXT NOT NULL,
    "timeprisOre" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NY',
    "opprettet" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Bestilling_familieId_fkey" FOREIGN KEY ("familieId") REFERENCES "Familie" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Bestilling_bestiltAvId_fkey" FOREIGN KEY ("bestiltAvId") REFERENCES "Bruker" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Bestilling_foresporselId_fkey" FOREIGN KEY ("foresporselId") REFERENCES "Hjelpeforesporsel" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Bestilling" ("foresporselId", "id", "opprettet", "status", "timeprisOre", "tjeneste") SELECT "foresporselId", "id", "opprettet", "status", "timeprisOre", "tjeneste" FROM "Bestilling";
DROP TABLE "Bestilling";
ALTER TABLE "new_Bestilling" RENAME TO "Bestilling";
CREATE UNIQUE INDEX "Bestilling_foresporselId_key" ON "Bestilling"("foresporselId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
