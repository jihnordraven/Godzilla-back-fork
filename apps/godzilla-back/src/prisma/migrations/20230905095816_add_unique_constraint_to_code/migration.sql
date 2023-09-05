/*
  Warnings:

  - A unique constraint covering the columns `[codeActivated]` on the table `ConfirmUser` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ConfirmUser_codeActivated_key" ON "ConfirmUser"("codeActivated");
