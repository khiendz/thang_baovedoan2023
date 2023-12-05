-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "UserId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "Address" TEXT NOT NULL,
    "Phone" TEXT NOT NULL,
    "AccountId" INTEGER
);
INSERT INTO "new_User" ("AccountId", "Address", "FirstName", "LastName", "Phone", "UserId") SELECT "AccountId", "Address", "FirstName", "LastName", "Phone", "UserId" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_Phone_key" ON "User"("Phone");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
