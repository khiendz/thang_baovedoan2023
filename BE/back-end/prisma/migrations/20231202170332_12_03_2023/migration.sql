-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TourType" (
    "TourTypeId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "Name" TEXT NOT NULL,
    "Description" TEXT,
    "PriceElder" REAL,
    "PriceChildren" REAL,
    "PromotionId" INTEGER,
    "Img" TEXT NOT NULL,
    "IsLocal" INTEGER NOT NULL,
    "RateTourType" INTEGER NOT NULL,
    "StartDate" DATETIME,
    "EndDate" DATETIME,
    "MaxSlot" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_TourType" ("Description", "Img", "IsLocal", "Name", "PriceChildren", "PriceElder", "PromotionId", "RateTourType", "TourTypeId") SELECT "Description", "Img", "IsLocal", "Name", "PriceChildren", "PriceElder", "PromotionId", "RateTourType", "TourTypeId" FROM "TourType";
DROP TABLE "TourType";
ALTER TABLE "new_TourType" RENAME TO "TourType";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
