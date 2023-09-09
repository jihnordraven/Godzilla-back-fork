-- CreateTable
CREATE TABLE "password_recovery_code" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "exp" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "is_used" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "password_recovery_code_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "password_recovery_code_id_key" ON "password_recovery_code"("id");

-- CreateIndex
CREATE UNIQUE INDEX "password_recovery_code_code_key" ON "password_recovery_code"("code");

-- AddForeignKey
ALTER TABLE "password_recovery_code" ADD CONSTRAINT "password_recovery_code_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
