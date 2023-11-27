/*
  Warnings:

  - Made the column `Description` on table `RoleAccount` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `UserId` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "UserId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "Phone" INTEGER NOT NULL,
    "AccountId" INTEGER
);
INSERT INTO "new_User" ("AccountId", "Address", "FirstName", "LastName", "Phone", "UserId") SELECT "AccountId", "Address", "FirstName", "LastName", "Phone", "UserId" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE TABLE "new_RoleAccount" (
    "RoleId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "RoleName" TEXT NOT NULL,
    "Description" TEXT NOT NULL
);
INSERT INTO "new_RoleAccount" ("Description", "RoleId", "RoleName") SELECT "Description", "RoleId", "RoleName" FROM "RoleAccount";
DROP TABLE "RoleAccount";
ALTER TABLE "new_RoleAccount" RENAME TO "RoleAccount";
CREATE TABLE "new_Account" (
    "AccountId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "UserName" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "RoleId" INTEGER NOT NULL DEFAULT 0,
    "UserId" INTEGER NOT NULL,
    CONSTRAINT "Account_UserId_fkey" FOREIGN KEY ("UserId") REFERENCES "User" ("UserId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Account_RoleId_fkey" FOREIGN KEY ("RoleId") REFERENCES "RoleAccount" ("RoleId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Account" ("AccountId", "Password", "RoleId", "UserName") SELECT "AccountId", "Password", "RoleId", "UserName" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
