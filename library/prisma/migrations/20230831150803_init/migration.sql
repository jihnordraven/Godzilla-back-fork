/*
  Warnings:

  - You are about to drop the column `codeActivated` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `codeActivatedExpired` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isConfirmed` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "codeActivated",
DROP COLUMN "codeActivatedExpired",
DROP COLUMN "isConfirmed";

-- CreateTable
CREATE TABLE "ConfirmUser" (
    "id" TEXT NOT NULL,
    "isConfirmed" BOOLEAN NOT NULL DEFAULT false,
    "codeActivated" TEXT,
    "codeActivatedExpired" TEXT,
    "userOwnerId" TEXT NOT NULL,

    CONSTRAINT "ConfirmUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ConfirmUser_userOwnerId_key" ON "ConfirmUser"("userOwnerId");

-- AddForeignKey
ALTER TABLE "ConfirmUser" ADD CONSTRAINT "ConfirmUser_userOwnerId_fkey" FOREIGN KEY ("userOwnerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
