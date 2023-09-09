/*
  Warnings:

  - You are about to drop the column `status` on the `email_confirm_codes` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `password_recovery_codes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "email_confirm_codes" DROP COLUMN "status",
ADD COLUMN     "is_used" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "password_recovery_codes" DROP COLUMN "status",
ADD COLUMN     "is_used" BOOLEAN NOT NULL DEFAULT false;
