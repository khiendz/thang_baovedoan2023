/*
  Warnings:

  - Added the required column `TotalChd` to the `Tour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TotalElder` to the `Tour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TotalMember` to the `Tour` table without a default value. This is not possible if the table is not empty.

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
    "PromotionId" INTEGER NOT NULL,
    "TourTypeId" INTEGER NOT NULL,
    "RoomTypeId" INTEGER NOT NULL,
    "Img" TEXT,
    CONSTRAINT "Tour_TourTypeId_fkey" FOREIGN KEY ("TourTypeId") REFERENCES "TourType" ("TourTypeId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tour_RoomTypeId_fkey" FOREIGN KEY ("RoomTypeId") REFERENCES "RoomType" ("RoomTypeId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tour" ("Description", "EndDate", "Img", "Location", "PriceTotal", "PromotionId", "RoomTypeId", "StartDate", "TourID", "TourName", "TourTypeId") SELECT "Description", "EndDate", "Img", "Location", "PriceTotal", "PromotionId", "RoomTypeId", "StartDate", "TourID", "TourName", "TourTypeId" FROM "Tour";
DROP TABLE "Tour";
ALTER TABLE "new_Tour" RENAME TO "Tour";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
