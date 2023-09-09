/*
  Warnings:

  - You are about to drop the column `is_used` on the `email_confirm_codes` table. All the data in the column will be lost.
  - You are about to drop the column `is_used` on the `password_recovery_codes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "email_confirm_codes" DROP COLUMN "is_used",
ADD COLUMN     "status" "CodeStatusEnum" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "password_recovery_codes" DROP COLUMN "is_used",
ADD COLUMN     "status" "CodeStatusEnum" NOT NULL DEFAULT 'ACTIVE';
