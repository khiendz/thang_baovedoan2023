/*
  Warnings:

  - You are about to drop the column `CollectImgId` on the `TourType` table. All the data in the column will be lost.
  - Added the required column `TourTypeId` to the `CollectImg` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CollectImg" (
    "CollectImgId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT,
    "Src" TEXT NOT NULL,
    "TourTypeId" INTEGER NOT NULL,
    CONSTRAINT "CollectImg_TourTypeId_fkey" FOREIGN KEY ("TourTypeId") REFERENCES "TourType" ("TourTypeId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CollectImg" ("CollectImgId", "Name", "Src") SELECT "CollectImgId", "Name", "Src" FROM "CollectImg";
DROP TABLE "CollectImg";
ALTER TABLE "new_CollectImg" RENAME TO "CollectImg";
CREATE TABLE "new_TourType" (
    "TourTypeId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Description" TEXT,
    "PriceElder" REAL,
    "PriceChildren" REAL,
    "PromotionId" INTEGER NOT NULL,
    "Img" TEXT NOT NULL,
    "IsLocal" INTEGER NOT NULL,
    "RateTourType" INTEGER NOT NULL
);
INSERT INTO "new_TourType" ("Description", "Img", "IsLocal", "Name", "PriceChildren", "PriceElder", "PromotionId", "RateTourType", "TourTypeId") SELECT "Description", "Img", "IsLocal", "Name", "PriceChildren", "PriceElder", "PromotionId", "RateTourType", "TourTypeId" FROM "TourType";
DROP TABLE "TourType";
ALTER TABLE "new_TourType" RENAME TO "TourType";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
