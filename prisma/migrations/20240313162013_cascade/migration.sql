-- DropForeignKey
ALTER TABLE `Achievements_images` DROP FOREIGN KEY `Achievements_images_Achievements_achievement_id_fk`;

-- DropForeignKey
ALTER TABLE `Comments` DROP FOREIGN KEY `Comments_Users_user_id_fk`;

-- DropForeignKey
ALTER TABLE `Friends` DROP FOREIGN KEY `Friends_Users_user_id_fk`;

-- DropForeignKey
ALTER TABLE `Item_status` DROP FOREIGN KEY `Item_status_item_id_fkey`;

-- DropForeignKey
ALTER TABLE `Item_status` DROP FOREIGN KEY `Item_status_mygunplalist_id_fkey`;

-- DropForeignKey
ALTER TABLE `Items_images` DROP FOREIGN KEY `Items_images_Items_item_id_fk`;

-- DropForeignKey
ALTER TABLE `Items_props` DROP FOREIGN KEY `Items_props_Items_item_id_fk`;

-- DropForeignKey
ALTER TABLE `Mygunplalist` DROP FOREIGN KEY `Mygunplalist_Users_user_id_fk`;

-- DropForeignKey
ALTER TABLE `User_achievements` DROP FOREIGN KEY `User_achievements_Achievement_id_fk`;

-- DropForeignKey
ALTER TABLE `User_achievements` DROP FOREIGN KEY `User_achievements_User_user_id_fk`;

-- DropForeignKey
ALTER TABLE `Users_images` DROP FOREIGN KEY `Users_images_Users_user_id_fk`;

-- DropForeignKey
ALTER TABLE `Wishlists` DROP FOREIGN KEY `Wishlists_Users_user_id_fk`;

-- CreateIndex
CREATE INDEX `Item_status_mygunplalist_id_fkey` ON `Item_status`(`mygunplalist_id`);

-- AddForeignKey
ALTER TABLE `Achievements_images` ADD CONSTRAINT `Achievements_images_Achievements_achievement_id_fk` FOREIGN KEY (`achievement_id`) REFERENCES `Achievements`(`achievement_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_Users_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Friends` ADD CONSTRAINT `Friends_Users_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Items_images` ADD CONSTRAINT `Items_images_Items_item_id_fk` FOREIGN KEY (`item_id`) REFERENCES `Items`(`item_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Items_props` ADD CONSTRAINT `Items_props_Items_item_id_fk` FOREIGN KEY (`item_id`) REFERENCES `Items`(`item_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item_status` ADD CONSTRAINT `Item_status_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `Items`(`item_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item_status` ADD CONSTRAINT `Item_status_mygunplalist_id_fkey` FOREIGN KEY (`mygunplalist_id`) REFERENCES `Mygunplalist`(`mygunplalist_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mygunplalist` ADD CONSTRAINT `Mygunplalist_Users_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_achievements` ADD CONSTRAINT `User_achievements_Achievement_id_fk` FOREIGN KEY (`achievement_id`) REFERENCES `Achievements`(`achievement_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_achievements` ADD CONSTRAINT `User_achievements_User_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Users_images` ADD CONSTRAINT `Users_images_Users_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Wishlists` ADD CONSTRAINT `Wishlists_Users_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
