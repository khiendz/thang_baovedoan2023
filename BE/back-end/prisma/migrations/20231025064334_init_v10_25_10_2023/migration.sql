/*
  Warnings:

  - Added the required column `IsLocal` to the `TourType` table without a default value. This is not possible if the table is not empty.

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
    "Img" TEXT NOT NULL,
    "IsLocal" INTEGER NOT NULL
);
INSERT INTO "new_TourType" ("Description", "Img", "Name", "PriceChildren", "PriceElder", "PromotionId", "TourTypeId") SELECT "Description", "Img", "Name", "PriceChildren", "PriceElder", "PromotionId", "TourTypeId" FROM "TourType";
DROP TABLE "TourType";
ALTER TABLE "new_TourType" RENAME TO "TourType";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
