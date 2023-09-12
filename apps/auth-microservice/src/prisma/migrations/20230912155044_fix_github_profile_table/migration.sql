/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `github_profiles` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `github_profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "github_profiles" ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "github_profiles_user_id_key" ON "github_profiles"("user_id");

-- AddForeignKey
ALTER TABLE "github_profiles" ADD CONSTRAINT "github_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
