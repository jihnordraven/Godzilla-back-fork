-- CreateTable
CREATE TABLE "google_profiles" (
    "id" TEXT NOT NULL,
    "provider_id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "display_name" TEXT,
    "provider" TEXT NOT NULL,

    CONSTRAINT "google_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "google_profiles_id_key" ON "google_profiles"("id");

-- CreateIndex
CREATE UNIQUE INDEX "google_profiles_provider_id_key" ON "google_profiles"("provider_id");

-- CreateIndex
CREATE UNIQUE INDEX "google_profiles_username_key" ON "google_profiles"("username");

-- CreateIndex
CREATE UNIQUE INDEX "google_profiles_email_key" ON "google_profiles"("email");
