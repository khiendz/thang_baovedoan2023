/*
  Warnings:

  - A unique constraint covering the columns `[Phone]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Customer_Phone_key" ON "Customer"("Phone");
