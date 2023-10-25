/*
  Warnings:

  - Added the required column `RoomTypeId` to the `Tour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CustomerTypeId` to the `Customer` table without a default value. This is not possible if the table is not empty.

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
    "RoomTypeId" INTEGER NOT NULL,
    "Img" TEXT,
    CONSTRAINT "Tour_TourTypeId_fkey" FOREIGN KEY ("TourTypeId") REFERENCES "TourType" ("TourTypeId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Tour_RoomTypeId_fkey" FOREIGN KEY ("RoomTypeId") REFERENCES "RoomType" ("RoomTypeId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tour" ("Description", "EndDate", "Img", "Location", "PriceTotal", "PromotionId", "StartDate", "TourID", "TourName", "TourTypeId") SELECT "Description", "EndDate", "Img", "Location", "PriceTotal", "PromotionId", "StartDate", "TourID", "TourName", "TourTypeId" FROM "Tour";
DROP TABLE "Tour";
ALTER TABLE "new_Tour" RENAME TO "Tour";
CREATE TABLE "new_Customer" (
    "CustomerID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Phone" TEXT,
    "Address" TEXT,
    "CustomerTypeId" INTEGER NOT NULL,
    CONSTRAINT "Customer_CustomerTypeId_fkey" FOREIGN KEY ("CustomerTypeId") REFERENCES "CustomerType" ("CustomerTypeId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Customer" ("Address", "CustomerID", "Email", "FirstName", "LastName", "Phone") SELECT "Address", "CustomerID", "Email", "FirstName", "LastName", "Phone" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_Email_key" ON "Customer"("Email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
