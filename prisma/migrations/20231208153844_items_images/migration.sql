-- CreateTable
CREATE TABLE `Achievements` (
    `achievement_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` LONGTEXT NULL,

    PRIMARY KEY (`achievement_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Achievements_images` (
    `achievement_image_id` INTEGER NOT NULL AUTO_INCREMENT,
    `image_path` TEXT NULL,

    PRIMARY KEY (`achievement_image_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comments` (
    `comment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `comment_content` LONGTEXT NULL,

    PRIMARY KEY (`comment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Friends` (
    `friend_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,

    INDEX `Friend_User_user_id_fk`(`user_id`),
    PRIMARY KEY (`friend_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Items` (
    `item_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `release_date` VARCHAR(255) NULL,
    `barcode` VARCHAR(255) NULL,
    `description` LONGTEXT NULL,
    `ROG_Url` TEXT NULL,

    PRIMARY KEY (`item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Items_images` (
    `item_image_id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_id` INTEGER NOT NULL,
    `image_path` TEXT NULL,

    PRIMARY KEY (`item_image_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Items_props` (
    `item_props_id` INTEGER NOT NULL AUTO_INCREMENT,
    `grade` VARCHAR(255) NULL,
    `scale` VARCHAR(255) NULL,
    `series` VARCHAR(255) NULL,

    PRIMARY KEY (`item_props_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mygunplalist` (
    `mygunplalist_id` INTEGER NOT NULL AUTO_INCREMENT,
    `barcode` VARCHAR(255) NULL,

    PRIMARY KEY (`mygunplalist_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_achievements` (
    `user_achievement_id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`user_achievement_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `firstname` VARCHAR(255) NOT NULL,
    `lastname` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `birthdate` DATE NOT NULL,
    `createdAt` DATETIME(0) NOT NULL,
    `role` ENUM('user', 'admin') NOT NULL,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Users_images` (
    `user_image_id` INTEGER NOT NULL AUTO_INCREMENT,
    `image_path` TEXT NULL,

    PRIMARY KEY (`user_image_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Wishlists` (
    `wishlist_id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`wishlist_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Achievements_images` ADD CONSTRAINT `Achievements_images_Achievements_achievement_id_fk` FOREIGN KEY (`achievement_image_id`) REFERENCES `Achievements`(`achievement_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_Users_user_id_fk` FOREIGN KEY (`comment_id`) REFERENCES `Users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Friends` ADD CONSTRAINT `Friend_User_id_fk` FOREIGN KEY (`friend_id`) REFERENCES `Users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Friends` ADD CONSTRAINT `Friend_User_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Items_images` ADD CONSTRAINT `Items_images_Items_item_id_fk` FOREIGN KEY (`item_image_id`) REFERENCES `Items`(`item_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Items_props` ADD CONSTRAINT `Items_props_Items_item_id_fk` FOREIGN KEY (`item_props_id`) REFERENCES `Items`(`item_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Mygunplalist` ADD CONSTRAINT `Mygunplalist_Items_item_id_fk` FOREIGN KEY (`mygunplalist_id`) REFERENCES `Items`(`item_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Mygunplalist` ADD CONSTRAINT `Mygunplalist_Users_user_id_fk` FOREIGN KEY (`mygunplalist_id`) REFERENCES `Users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `User_achievements` ADD CONSTRAINT `User_achievements_Achievement_id_fk` FOREIGN KEY (`user_achievement_id`) REFERENCES `Achievements`(`achievement_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `User_achievements` ADD CONSTRAINT `User_achievements_User_user_id_fk` FOREIGN KEY (`user_achievement_id`) REFERENCES `Users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Users_images` ADD CONSTRAINT `Images_User_user_id_fk` FOREIGN KEY (`user_image_id`) REFERENCES `Users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Wishlists` ADD CONSTRAINT `Wishlists_Items_item_id_fk` FOREIGN KEY (`wishlist_id`) REFERENCES `Items`(`item_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Wishlists` ADD CONSTRAINT `Wishlists_User_user_id_fk` FOREIGN KEY (`wishlist_id`) REFERENCES `Users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
