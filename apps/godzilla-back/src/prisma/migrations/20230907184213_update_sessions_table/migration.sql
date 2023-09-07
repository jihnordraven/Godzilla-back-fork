/*
  Warnings:

  - You are about to drop the column `ip` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `session_expired` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `sessions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_agent]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `expires` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_agent` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_ip` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "ip",
DROP COLUMN "session_expired",
DROP COLUMN "title",
ADD COLUMN     "expires" TEXT NOT NULL,
ADD COLUMN     "user_agent" TEXT NOT NULL,
ADD COLUMN     "user_ip" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "sessions_user_agent_key" ON "sessions"("user_agent");
