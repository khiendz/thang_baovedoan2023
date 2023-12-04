/*
  Warnings:

  - Made the column `Phone` on table `Customer` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Customer" (
    "CustomerID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Phone" TEXT NOT NULL,
    "Address" TEXT,
    "CustomerTypeId" INTEGER NOT NULL,
    CONSTRAINT "Customer_CustomerTypeId_fkey" FOREIGN KEY ("CustomerTypeId") REFERENCES "CustomerType" ("CustomerTypeId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Customer" ("Address", "CustomerID", "CustomerTypeId", "Email", "FirstName", "LastName", "Phone") SELECT "Address", "CustomerID", "CustomerTypeId", "Email", "FirstName", "LastName", "Phone" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_Email_key" ON "Customer"("Email");
CREATE UNIQUE INDEX "Customer_Phone_key" ON "Customer"("Phone");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
