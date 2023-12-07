/*
  Warnings:

  - Added the required column `OrderCode` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Payment" (
    "PaymentID" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "BookingID" INTEGER NOT NULL,
    "PaymentDate" DATETIME NOT NULL,
    "Amount" REAL NOT NULL,
    "OrderCode" TEXT NOT NULL,
    CONSTRAINT "Payment_BookingID_fkey" FOREIGN KEY ("BookingID") REFERENCES "Booking" ("BookingID") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Payment" ("Amount", "BookingID", "PaymentDate", "PaymentID") SELECT "Amount", "BookingID", "PaymentDate", "PaymentID" FROM "Payment";
DROP TABLE "Payment";
ALTER TABLE "new_Payment" RENAME TO "Payment";
CREATE UNIQUE INDEX "Payment_OrderCode_key" ON "Payment"("OrderCode");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
