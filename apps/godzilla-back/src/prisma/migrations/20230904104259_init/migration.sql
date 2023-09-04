/*
  Warnings:

  - The primary key for the `ConfirmUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ConfirmUser` table. All the data in the column will be lost.
  - The primary key for the `Profile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Profile` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "ConfirmUser_userOwnerId_key";

-- DropIndex
DROP INDEX "Profile_userOwnerId_key";

-- AlterTable
ALTER TABLE "ConfirmUser" DROP CONSTRAINT "ConfirmUser_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "ConfirmUser_pkey" PRIMARY KEY ("userOwnerId");

-- AlterTable
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Profile_pkey" PRIMARY KEY ("userOwnerId");
