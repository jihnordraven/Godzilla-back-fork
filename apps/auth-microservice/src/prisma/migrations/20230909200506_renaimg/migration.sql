-- RenameIndex
ALTER INDEX "User.email_unique" RENAME TO "users_email_key";

-- RenameIndex
ALTER INDEX "User.login_unique" RENAME TO "users_username_key";
