/*
  Warnings:

  - Added the required column `Img` to the `TourType` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TourType" (
    "TourTypeId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Description" TEXT,
    "PriceElder" REAL,
    "PriceChildren" REAL,
    "PromotionId" INTEGER NOT NULL,
    "Img" TEXT NOT NULL
);
INSERT INTO "new_TourType" ("Description", "Name", "PriceChildren", "PriceElder", "PromotionId", "TourTypeId") SELECT "Description", "Name", "PriceChildren", "PriceElder", "PromotionId", "TourTypeId" FROM "TourType";
DROP TABLE "TourType";
ALTER TABLE "new_TourType" RENAME TO "TourType";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
