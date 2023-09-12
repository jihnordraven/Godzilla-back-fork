/*
  Warnings:

  - You are about to drop the column `display_name` on the `google_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `google_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `google_profiles` table. All the data in the column will be lost.
  - Added the required column `is_confirmed` to the `google_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "google_profiles_username_key";

-- AlterTable
ALTER TABLE "google_profiles" DROP COLUMN "display_name",
DROP COLUMN "provider",
DROP COLUMN "username",
ADD COLUMN     "family_name" TEXT,
ADD COLUMN     "given_name" TEXT,
ADD COLUMN     "is_confirmed" BOOLEAN NOT NULL,
ADD COLUMN     "locale" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "picture" TEXT;
