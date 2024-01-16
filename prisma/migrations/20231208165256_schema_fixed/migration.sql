/*
  Warnings:

  - A unique constraint covering the columns `[achievement_id]` on the table `Achievements_images` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[item_id]` on the table `Items_props` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Mygunplalist` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Wishlists` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `achievement_id` to the `Achievements_images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Comments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item_id` to the `Items_props` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Mygunplalist` table without a default value. This is not possible if the table is not empty.
  - Added the required column `achievement_id` to the `User_achievements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `User_achievements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Users_images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Wishlists` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Achievements_images` DROP FOREIGN KEY `Achievements_images_Achievements_achievement_id_fk`;

-- DropForeignKey
ALTER TABLE `Comments` DROP FOREIGN KEY `Comments_Users_user_id_fk`;

-- DropForeignKey
ALTER TABLE `Friends` DROP FOREIGN KEY `Friend_User_id_fk`;

-- DropForeignKey
ALTER TABLE `Friends` DROP FOREIGN KEY `Friend_User_user_id_fk`;

-- DropForeignKey
ALTER TABLE `Items_images` DROP FOREIGN KEY `Items_images_Items_item_id_fk`;

-- DropForeignKey
ALTER TABLE `Items_props` DROP FOREIGN KEY `Items_props_Items_item_id_fk`;

-- DropForeignKey
ALTER TABLE `Mygunplalist` DROP FOREIGN KEY `Mygunplalist_Items_item_id_fk`;

-- DropForeignKey
ALTER TABLE `Mygunplalist` DROP FOREIGN KEY `Mygunplalist_Users_user_id_fk`;

-- DropForeignKey
ALTER TABLE `User_achievements` DROP FOREIGN KEY `User_achievements_Achievement_id_fk`;

-- DropForeignKey
ALTER TABLE `User_achievements` DROP FOREIGN KEY `User_achievements_User_user_id_fk`;

-- DropForeignKey
ALTER TABLE `Users_images` DROP FOREIGN KEY `Images_User_user_id_fk`;

-- DropForeignKey
ALTER TABLE `Wishlists` DROP FOREIGN KEY `Wishlists_Items_item_id_fk`;

-- DropForeignKey
ALTER TABLE `Wishlists` DROP FOREIGN KEY `Wishlists_User_user_id_fk`;

-- AlterTable
ALTER TABLE `Achievements_images` ADD COLUMN `achievement_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Comments` ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Items_props` ADD COLUMN `item_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Mygunplalist` ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User_achievements` ADD COLUMN `achievement_id` INTEGER NOT NULL,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Users_images` ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Wishlists` ADD COLUMN `user_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `WishlistItems` (
    `wishlist_id` INTEGER NOT NULL,
    `item_id` INTEGER NOT NULL,

    PRIMARY KEY (`wishlist_id`, `item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ItemsToMygunplalist` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ItemsToMygunplalist_AB_unique`(`A`, `B`),
    INDEX `_ItemsToMygunplalist_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Achievements_images_achievement_id_key` ON `Achievements_images`(`achievement_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Items_props_item_id_key` ON `Items_props`(`item_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Mygunplalist_user_id_key` ON `Mygunplalist`(`user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Wishlists_user_id_key` ON `Wishlists`(`user_id`);

-- AddForeignKey
ALTER TABLE `Achievements_images` ADD CONSTRAINT `Achievements_images_Achievements_achievement_id_fk` FOREIGN KEY (`achievement_id`) REFERENCES `Achievements`(`achievement_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_Users_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Friends` ADD CONSTRAINT `Friends_Users_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Items_images` ADD CONSTRAINT `Items_images_Items_item_id_fk` FOREIGN KEY (`item_id`) REFERENCES `Items`(`item_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Items_props` ADD CONSTRAINT `Items_props_Items_item_id_fk` FOREIGN KEY (`item_id`) REFERENCES `Items`(`item_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Mygunplalist` ADD CONSTRAINT `Mygunplalist_Users_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `User_achievements` ADD CONSTRAINT `User_achievements_Achievement_id_fk` FOREIGN KEY (`achievement_id`) REFERENCES `Achievements`(`achievement_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `User_achievements` ADD CONSTRAINT `User_achievements_User_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Users_images` ADD CONSTRAINT `Users_images_Users_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Wishlists` ADD CONSTRAINT `Wishlists_Users_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `WishlistItems` ADD CONSTRAINT `WishlistItems_wishlist_id_fkey` FOREIGN KEY (`wishlist_id`) REFERENCES `Wishlists`(`wishlist_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WishlistItems` ADD CONSTRAINT `WishlistItems_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `Items`(`item_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ItemsToMygunplalist` ADD CONSTRAINT `_ItemsToMygunplalist_A_fkey` FOREIGN KEY (`A`) REFERENCES `Items`(`item_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ItemsToMygunplalist` ADD CONSTRAINT `_ItemsToMygunplalist_B_fkey` FOREIGN KEY (`B`) REFERENCES `Mygunplalist`(`mygunplalist_id`) ON DELETE CASCADE ON UPDATE CASCADE;
