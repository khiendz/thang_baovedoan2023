/*
  Warnings:

  - Added the required column `PromotionId` to the `Tour` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tour" (
    "TourID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "TourName" TEXT NOT NULL,
    "Description" TEXT,
    "PriceTotal" REAL NOT NULL,
    "StartDate" DATETIME NOT NULL,
    "EndDate" DATETIME NOT NULL,
    "Location" TEXT,
    "PromotionId" INTEGER NOT NULL,
    "TourTypeId" INTEGER NOT NULL,
    CONSTRAINT "Tour_TourTypeId_fkey" FOREIGN KEY ("TourTypeId") REFERENCES "TourType" ("TourTypeId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tour" ("Description", "EndDate", "Location", "PriceTotal", "StartDate", "TourID", "TourName", "TourTypeId") SELECT "Description", "EndDate", "Location", "PriceTotal", "StartDate", "TourID", "TourName", "TourTypeId" FROM "Tour";
DROP TABLE "Tour";
ALTER TABLE "new_Tour" RENAME TO "Tour";
CREATE TABLE "new_Promotion" (
    "PromotionID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "PromoCode" TEXT NOT NULL,
    "Description" TEXT,
    "Discount" REAL,
    "StartDate" DATETIME NOT NULL,
    "EndDate" DATETIME NOT NULL,
    "tourTourID" INTEGER,
    CONSTRAINT "Promotion_tourTourID_fkey" FOREIGN KEY ("tourTourID") REFERENCES "Tour" ("TourID") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Promotion" ("Description", "Discount", "EndDate", "PromoCode", "PromotionID", "StartDate") SELECT "Description", "Discount", "EndDate", "PromoCode", "PromotionID", "StartDate" FROM "Promotion";
DROP TABLE "Promotion";
ALTER TABLE "new_Promotion" RENAME TO "Promotion";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
