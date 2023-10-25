/*
  Warnings:

  - You are about to drop the column `PromotionId` on the `Tour` table. All the data in the column will be lost.
  - You are about to drop the column `tourTourID` on the `Promotion` table. All the data in the column will be lost.
  - Added the required column `PromotionId` to the `TourType` table without a default value. This is not possible if the table is not empty.

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
    "TotalMember" INTEGER NOT NULL,
    "TotalChd" INTEGER NOT NULL,
    "TotalElder" INTEGER NOT NULL,
    "TourTypeId" INTEGER NOT NULL,
    "RoomTypeId" INTEGER NOT NULL,
    "Img" TEXT,
    CONSTRAINT "Tour_TourTypeId_fkey" FOREIGN KEY ("TourTypeId") REFERENCES "TourType" ("TourTypeId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tour_RoomTypeId_fkey" FOREIGN KEY ("RoomTypeId") REFERENCES "RoomType" ("RoomTypeId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tour" ("Description", "EndDate", "Img", "Location", "PriceTotal", "RoomTypeId", "StartDate", "TotalChd", "TotalElder", "TotalMember", "TourID", "TourName", "TourTypeId") SELECT "Description", "EndDate", "Img", "Location", "PriceTotal", "RoomTypeId", "StartDate", "TotalChd", "TotalElder", "TotalMember", "TourID", "TourName", "TourTypeId" FROM "Tour";
DROP TABLE "Tour";
ALTER TABLE "new_Tour" RENAME TO "Tour";
CREATE TABLE "new_TourType" (
    "TourTypeId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Description" TEXT,
    "PriceElder" REAL,
    "PriceChildren" REAL,
    "PromotionId" INTEGER NOT NULL
);
INSERT INTO "new_TourType" ("Description", "Name", "PriceChildren", "PriceElder", "TourTypeId") SELECT "Description", "Name", "PriceChildren", "PriceElder", "TourTypeId" FROM "TourType";
DROP TABLE "TourType";
ALTER TABLE "new_TourType" RENAME TO "TourType";
CREATE TABLE "new_Promotion" (
    "PromotionID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "PromoCode" TEXT NOT NULL,
    "Description" TEXT,
    "Discount" REAL,
    "StartDate" DATETIME NOT NULL,
    "EndDate" DATETIME NOT NULL,
    "TourTypeId" INTEGER,
    CONSTRAINT "Promotion_TourTypeId_fkey" FOREIGN KEY ("TourTypeId") REFERENCES "TourType" ("TourTypeId") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Promotion" ("Description", "Discount", "EndDate", "PromoCode", "PromotionID", "StartDate") SELECT "Description", "Discount", "EndDate", "PromoCode", "PromotionID", "StartDate" FROM "Promotion";
DROP TABLE "Promotion";
ALTER TABLE "new_Promotion" RENAME TO "Promotion";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
