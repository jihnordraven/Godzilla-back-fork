/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `google_profiles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `google_profiles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `google_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "google_profiles" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "google_profiles_user_id_key" ON "google_profiles"("user_id");

-- AddForeignKey
ALTER TABLE "google_profiles" ADD CONSTRAINT "google_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
