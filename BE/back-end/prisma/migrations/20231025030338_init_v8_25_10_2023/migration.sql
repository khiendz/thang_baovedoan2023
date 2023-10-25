/*
  Warnings:

  - Added the required column `KateFee` to the `RoomType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RoomEndDate` to the `Tour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RoomStartDate` to the `Tour` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RoomType" (
    "RoomTypeId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT,
    "MaxOccupancy" INTEGER,
    "Price" REAL,
    "HotelId" INTEGER,
    "KateFee" INTEGER NOT NULL,
    CONSTRAINT "RoomType_HotelId_fkey" FOREIGN KEY ("HotelId") REFERENCES "Hotel" ("HotelId") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_RoomType" ("HotelId", "MaxOccupancy", "Name", "Price", "RoomTypeId") SELECT "HotelId", "MaxOccupancy", "Name", "Price", "RoomTypeId" FROM "RoomType";
DROP TABLE "RoomType";
ALTER TABLE "new_RoomType" RENAME TO "RoomType";
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
    "RoomStartDate" DATETIME NOT NULL,
    "RoomEndDate" DATETIME NOT NULL,
    CONSTRAINT "Tour_TourTypeId_fkey" FOREIGN KEY ("TourTypeId") REFERENCES "TourType" ("TourTypeId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tour_RoomTypeId_fkey" FOREIGN KEY ("RoomTypeId") REFERENCES "RoomType" ("RoomTypeId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tour" ("Description", "EndDate", "Img", "Location", "PriceTotal", "RoomTypeId", "StartDate", "TotalChd", "TotalElder", "TotalMember", "TourID", "TourName", "TourTypeId") SELECT "Description", "EndDate", "Img", "Location", "PriceTotal", "RoomTypeId", "StartDate", "TotalChd", "TotalElder", "TotalMember", "TourID", "TourName", "TourTypeId" FROM "Tour";
DROP TABLE "Tour";
ALTER TABLE "new_Tour" RENAME TO "Tour";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
