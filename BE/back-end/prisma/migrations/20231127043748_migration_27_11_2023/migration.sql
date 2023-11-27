-- CreateTable
CREATE TABLE "User" (
    "UserId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "Phone" INTEGER NOT NULL,
    "AccountId" INTEGER,
    CONSTRAINT "User_AccountId_fkey" FOREIGN KEY ("AccountId") REFERENCES "Account" ("AccountId") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Account" (
    "AccountId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "UserName" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "RoleId" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Account_RoleId_fkey" FOREIGN KEY ("RoleId") REFERENCES "RoleAccount" ("RoleId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RoleAccount" (
    "RoleId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "RoleName" TEXT NOT NULL,
    "Description" TEXT
);

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
    "RateTourType" INTEGER NOT NULL
);
INSERT INTO "new_TourType" ("Description", "Img", "IsLocal", "Name", "PriceChildren", "PriceElder", "PromotionId", "RateTourType", "TourTypeId") SELECT "Description", "Img", "IsLocal", "Name", "PriceChildren", "PriceElder", "PromotionId", "RateTourType", "TourTypeId" FROM "TourType";
DROP TABLE "TourType";
ALTER TABLE "new_TourType" RENAME TO "TourType";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
