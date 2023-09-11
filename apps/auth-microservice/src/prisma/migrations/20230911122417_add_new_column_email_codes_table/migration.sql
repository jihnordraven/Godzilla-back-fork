/*
  Warnings:

  - Added the required column `is_used` to the `email_codes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "email_codes" ADD COLUMN     "is_used" BOOLEAN NOT NULL;
