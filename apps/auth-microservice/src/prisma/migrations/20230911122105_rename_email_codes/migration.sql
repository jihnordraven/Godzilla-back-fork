/*
  Warnings:

  - You are about to drop the column `expires` on the `email_codes` table. All the data in the column will be lost.
  - Added the required column `expires_in` to the `email_codes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "email_codes" DROP COLUMN "expires",
ADD COLUMN     "expires_in" TIMESTAMP(3) NOT NULL;
