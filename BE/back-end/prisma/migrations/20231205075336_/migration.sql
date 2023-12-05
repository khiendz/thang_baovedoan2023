/*
  Warnings:

  - A unique constraint covering the columns `[Phone]` on the table `Hotel` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Phone]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Hotel_Phone_key" ON "Hotel"("Phone");

-- CreateIndex
CREATE UNIQUE INDEX "User_Phone_key" ON "User"("Phone");
