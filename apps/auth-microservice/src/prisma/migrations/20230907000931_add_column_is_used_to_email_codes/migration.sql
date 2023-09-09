-- AlterTable
ALTER TABLE "email_confirm_codes" ADD COLUMN     "is_used" BOOLEAN NOT NULL DEFAULT false;
