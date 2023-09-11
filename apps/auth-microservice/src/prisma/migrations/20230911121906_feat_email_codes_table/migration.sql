/*
  Warnings:

  - You are about to drop the `email_confirm_codes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `password_recovery_codes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "email_confirm_codes" DROP CONSTRAINT "email_confirm_codes_user_id_fkey";

-- DropForeignKey
ALTER TABLE "password_recovery_codes" DROP CONSTRAINT "password_recovery_codes_user_id_fkey";

-- DropTable
DROP TABLE "email_confirm_codes";

-- DropTable
DROP TABLE "password_recovery_codes";

-- CreateTable
CREATE TABLE "email_codes" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "email_codes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "email_codes_id_key" ON "email_codes"("id");

-- CreateIndex
CREATE UNIQUE INDEX "email_codes_code_key" ON "email_codes"("code");

-- AddForeignKey
ALTER TABLE "email_codes" ADD CONSTRAINT "email_codes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
