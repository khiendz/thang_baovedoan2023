/*
  Warnings:

  - Added the required column `CollectImgId` to the `TourType` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "CollectImg" (
    "CollectImgId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT,
    "Src" TEXT NOT NULL
);

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
    "IsLocal" INTEGER NOT NULL,
    "RateTourType" INTEGER NOT NULL,
    "CollectImgId" INTEGER NOT NULL,
    CONSTRAINT "TourType_CollectImgId_fkey" FOREIGN KEY ("CollectImgId") REFERENCES "CollectImg" ("CollectImgId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TourType" ("Description", "Img", "IsLocal", "Name", "PriceChildren", "PriceElder", "PromotionId", "RateTourType", "TourTypeId") SELECT "Description", "Img", "IsLocal", "Name", "PriceChildren", "PriceElder", "PromotionId", "RateTourType", "TourTypeId" FROM "TourType";
DROP TABLE "TourType";
ALTER TABLE "new_TourType" RENAME TO "TourType";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
