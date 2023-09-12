-- CreateTable
CREATE TABLE "github_profiles" (
    "id" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "location" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "github_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "github_profiles_id_key" ON "github_profiles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "github_profiles_provider_id_key" ON "github_profiles"("provider_id");

-- CreateIndex
CREATE UNIQUE INDEX "github_profiles_username_key" ON "github_profiles"("username");

-- CreateIndex
CREATE UNIQUE INDEX "github_profiles_email_key" ON "github_profiles"("email");
