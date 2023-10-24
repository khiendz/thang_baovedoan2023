/*
  Warnings:

  - You are about to drop the column `tourTourID` on the `Promotion` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Promotion" (
    "PromotionID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "PromoCode" TEXT NOT NULL,
    "Description" TEXT,
    "Discount" REAL,
    "StartDate" DATETIME NOT NULL,
    "EndDate" DATETIME NOT NULL,
    "TourID" INTEGER,
    CONSTRAINT "Promotion_TourID_fkey" FOREIGN KEY ("TourID") REFERENCES "Tour" ("TourID") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Promotion" ("Description", "Discount", "EndDate", "PromoCode", "PromotionID", "StartDate") SELECT "Description", "Discount", "EndDate", "PromoCode", "PromotionID", "StartDate" FROM "Promotion";
DROP TABLE "Promotion";
ALTER TABLE "new_Promotion" RENAME TO "Promotion";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
