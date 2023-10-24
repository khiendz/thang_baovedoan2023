/*
  Warnings:

  - You are about to alter the column `Amount` on the `Payment` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to drop the column `SupportType` on the `CustomerSupport` table. All the data in the column will be lost.
  - You are about to alter the column `Discount` on the `Promotion` table. The data in that column could be lost. The data in that column will be cast from `Decimal` to `Float`.
  - You are about to drop the column `Price` on the `Tour` table. All the data in the column will be lost.
  - Added the required column `SupportTypeId` to the `CustomerSupport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PriceTotal` to the `Tour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TourTypeId` to the `Tour` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "idx_tour_id";

-- DropIndex
DROP INDEX "idx_customer_id";

-- CreateTable
CREATE TABLE "TourType" (
    "TourTypeId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Description" TEXT,
    "PriceElder" REAL,
    "PriceChildren" REAL
);

-- CreateTable
CREATE TABLE "CustomerType" (
    "CustomerTypeId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Description" TEXT
);

-- CreateTable
CREATE TABLE "SupportType" (
    "SupportTypeId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Description" TEXT
);

-- CreateTable
CREATE TABLE "Hotel" (
    "HotelId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Address" TEXT,
    "City" TEXT,
    "Country" TEXT,
    "StarRating" INTEGER,
    "Description" TEXT,
    "Phone" TEXT,
    "Website" TEXT,
    "Email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "RoomType" (
    "RoomTypeId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT,
    "MaxOccupancy" INTEGER,
    "Price" REAL,
    "HotelId" INTEGER,
    CONSTRAINT "RoomType_HotelId_fkey" FOREIGN KEY ("HotelId") REFERENCES "Hotel" ("HotelId") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Availability" (
    "AvailabilityId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "DateCheck" DATETIME,
    "AvailableRooms" INTEGER,
    "RoomTypeId" INTEGER,
    CONSTRAINT "Availability_RoomTypeId_fkey" FOREIGN KEY ("RoomTypeId") REFERENCES "RoomType" ("RoomTypeId") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Payment" (
    "PaymentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "BookingID" INTEGER NOT NULL,
    "PaymentDate" DATETIME NOT NULL,
    "Amount" REAL NOT NULL,
    CONSTRAINT "Payment_BookingID_fkey" FOREIGN KEY ("BookingID") REFERENCES "Booking" ("BookingID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Payment" ("Amount", "BookingID", "PaymentDate", "PaymentID") SELECT "Amount", "BookingID", "PaymentDate", "PaymentID" FROM "Payment";
DROP TABLE "Payment";
ALTER TABLE "new_Payment" RENAME TO "Payment";
CREATE TABLE "new_CustomerSupport" (
    "SupportID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "CustomerID" INTEGER NOT NULL,
    "SupportTypeId" INTEGER NOT NULL,
    "SupportDate" DATETIME NOT NULL,
    "Description" TEXT,
    CONSTRAINT "CustomerSupport_CustomerID_fkey" FOREIGN KEY ("CustomerID") REFERENCES "Customer" ("CustomerID") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CustomerSupport_SupportTypeId_fkey" FOREIGN KEY ("SupportTypeId") REFERENCES "SupportType" ("SupportTypeId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CustomerSupport" ("CustomerID", "Description", "SupportDate", "SupportID") SELECT "CustomerID", "Description", "SupportDate", "SupportID" FROM "CustomerSupport";
DROP TABLE "CustomerSupport";
ALTER TABLE "new_CustomerSupport" RENAME TO "CustomerSupport";
CREATE TABLE "new_Promotion" (
    "PromotionID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "PromoCode" TEXT NOT NULL,
    "Description" TEXT,
    "Discount" REAL,
    "StartDate" DATETIME NOT NULL,
    "EndDate" DATETIME NOT NULL
);
INSERT INTO "new_Promotion" ("Description", "Discount", "EndDate", "PromoCode", "PromotionID", "StartDate") SELECT "Description", "Discount", "EndDate", "PromoCode", "PromotionID", "StartDate" FROM "Promotion";
DROP TABLE "Promotion";
ALTER TABLE "new_Promotion" RENAME TO "Promotion";
CREATE TABLE "new_Tour" (
    "TourID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "TourName" TEXT NOT NULL,
    "Description" TEXT,
    "PriceTotal" REAL NOT NULL,
    "StartDate" DATETIME NOT NULL,
    "EndDate" DATETIME NOT NULL,
    "Location" TEXT,
    "TourTypeId" INTEGER NOT NULL,
    CONSTRAINT "Tour_TourTypeId_fkey" FOREIGN KEY ("TourTypeId") REFERENCES "TourType" ("TourTypeId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Tour" ("Description", "EndDate", "Location", "StartDate", "TourID", "TourName") SELECT "Description", "EndDate", "Location", "StartDate", "TourID", "TourName" FROM "Tour";
DROP TABLE "Tour";
ALTER TABLE "new_Tour" RENAME TO "Tour";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
