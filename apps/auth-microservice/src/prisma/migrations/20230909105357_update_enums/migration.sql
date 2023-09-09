/*
  Warnings:

  - The `is_used` column on the `email_confirm_codes` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `is_confirmed` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `password_recovery_code` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ConfirmEmailStatusEnum" AS ENUM ('PENDING', 'CONFIRMED');

-- CreateEnum
CREATE TYPE "CodeStatusEnum" AS ENUM ('ACTIVE', 'USED', 'BLOCKED');

-- DropForeignKey
ALTER TABLE "password_recovery_code" DROP CONSTRAINT "password_recovery_code_user_id_fkey";

-- AlterTable
ALTER TABLE "email_confirm_codes" DROP COLUMN "is_used",
ADD COLUMN     "is_used" "CodeStatusEnum" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "users" DROP COLUMN "is_confirmed",
ADD COLUMN     "is_confirmed" "ConfirmEmailStatusEnum" NOT NULL DEFAULT 'PENDING';

-- DropTable
DROP TABLE "password_recovery_code";

-- CreateTable
CREATE TABLE "password_recovery_codes" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "exp" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "is_used" "CodeStatusEnum" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "password_recovery_codes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "password_recovery_codes_id_key" ON "password_recovery_codes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "password_recovery_codes_code_key" ON "password_recovery_codes"("code");

-- AddForeignKey
ALTER TABLE "password_recovery_codes" ADD CONSTRAINT "password_recovery_codes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
