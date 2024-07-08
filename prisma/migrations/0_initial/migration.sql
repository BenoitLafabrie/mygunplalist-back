-- CreateTable
CREATE TABLE `Achievements` (
    `achievement_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` LONGTEXT NULL,

    PRIMARY KEY (`achievement_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
ENGINE=InnoDB;

-- CreateTable
CREATE TABLE `Achievements_images` (
    `achievement_image_id` INTEGER NOT NULL AUTO_INCREMENT,
    `image_path` TEXT NULL,
    `achievement_id` INTEGER NOT NULL,

    UNIQUE INDEX `Achievements_images_achievement_id_key`(`achievement_id`),
    PRIMARY KEY (`achievement_image_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
ENGINE=InnoDB;

-- CreateTable
CREATE TABLE `Comments` (
    `comment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `comment_content` LONGTEXT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `Comments_Users_user_id_index`(`user_id`),
    PRIMARY KEY (`comment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
ENGINE=InnoDB;

-- CreateTable
CREATE TABLE `Friends` (
    `friend_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,

    INDEX `Friend_User_user_id_index`(`user_id`),
    PRIMARY KEY (`friend_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
ENGINE=InnoDB;

-- CreateTable
CREATE TABLE `Item_status` (
    `item_status_id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_id` INTEGER NOT NULL,
    `mygunplalist_id` INTEGER NOT NULL,
    `status` ENUM('Garage', 'Assembling', 'Deployed') NOT NULL DEFAULT 'Garage',

    INDEX `Item_status_item_id_key`(`item_id`),
    INDEX `Item_status_mygunplalist_id_index`(`mygunplalist_id`),
    PRIMARY KEY (`item_status_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
ENGINE=InnoDB;

-- CreateTable
CREATE TABLE `Items` (
    `item_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `release_date` VARCHAR(50) NULL,
    `barcode` VARCHAR(20) NULL,
    `description` LONGTEXT NULL,
    `ROG_url` TEXT NULL,

    PRIMARY KEY (`item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
ENGINE=InnoDB;

-- CreateTable
CREATE TABLE `Items_images` (
    `item_image_id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_id` INTEGER NOT NULL,
    `image_path` TEXT NULL,

    INDEX `Items_images_Items_item_id_index`(`item_id`),
    PRIMARY KEY (`item_image_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
ENGINE=InnoDB;

-- CreateTable
CREATE TABLE `Items_props` (
    `item_props_id` INTEGER NOT NULL AUTO_INCREMENT,
    `grade` VARCHAR(255) NULL,
    `scale` VARCHAR(25) NULL,
    `series` VARCHAR(255) NULL,
    `item_id` INTEGER NOT NULL,

    UNIQUE INDEX `Items_props_item_id_key`(`item_id`),
    PRIMARY KEY (`item_props_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
ENGINE=InnoDB;

-- CreateTable
CREATE TABLE `Mygunplalist` (
    `mygunplalist_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,

    UNIQUE INDEX `Mygunplalist_user_id_key`(`user_id`),
    PRIMARY KEY (`mygunplalist_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
ENGINE=InnoDB;

-- CreateTable
CREATE TABLE `User_achievements` (
    `user_achievement_id` INTEGER NOT NULL AUTO_INCREMENT,
    `achievement_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `User_achievements_Achievement_id_index`(`achievement_id`),
    INDEX `User_achievements_User_user_id_index`(`user_id`),
    PRIMARY KEY (`user_achievement_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
ENGINE=InnoDB;

-- CreateTable
CREATE TABLE `Users` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `firstname` VARCHAR(255) NULL,
    `lastname` VARCHAR(255) NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `birthdate` DATE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    `address` VARCHAR(255) NULL,
    `city` VARCHAR(255) NULL,
    `country` VARCHAR(255) NULL,
    `gender` VARCHAR(255) NULL,
    `postcode` VARCHAR(255) NULL,

    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
ENGINE=InnoDB;

-- CreateTable
CREATE TABLE `Users_images` (
    `user_image_id` INTEGER NOT NULL AUTO_INCREMENT,
    `image_path` TEXT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `Users_images_Users_user_id_index`(`user_id`),
    PRIMARY KEY (`user_image_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
ENGINE=InnoDB;

-- CreateTable
CREATE TABLE `Wishlists` (
    `wishlist_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,

    UNIQUE INDEX `Wishlists_user_id_key`(`user_id`),
    PRIMARY KEY (`wishlist_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
ENGINE=InnoDB;

-- CreateTable
CREATE TABLE `_ItemsToWishlists` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    INDEX `_ItemsToWishlists_B_index`(`B`),
    UNIQUE INDEX `_ItemsToWishlists_AB_unique`(`A`, `B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
ENGINE=InnoDB;

-- AddForeignKey
ALTER TABLE `Achievements_images` ADD CONSTRAINT `Achievements_images_Achievements_achievement_id_fk` FOREIGN KEY (`achievement_id`) REFERENCES `Achievements`(`achievement_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_Users_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Friends` ADD CONSTRAINT `Friends_Users_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Item_status` ADD CONSTRAINT `Item_status_Mygunplalist_mygunplalist_id_fk` FOREIGN KEY (`mygunplalist_id`) REFERENCES `Mygunplalist`(`mygunplalist_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Item_status` ADD CONSTRAINT `Item_status_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `Items`(`item_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Items_images` ADD CONSTRAINT `Items_images_Items_item_id_fk` FOREIGN KEY (`item_id`) REFERENCES `Items`(`item_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Items_props` ADD CONSTRAINT `Items_props_Items_item_id_fk` FOREIGN KEY (`item_id`) REFERENCES `Items`(`item_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `User_achievements` ADD CONSTRAINT `User_achievements_achievement_id_fkey` FOREIGN KEY (`achievement_id`) REFERENCES `Achievements`(`achievement_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `User_achievements` ADD CONSTRAINT `User_achievements_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Users_images` ADD CONSTRAINT `Users_images_Users_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `_ItemsToWishlists` ADD CONSTRAINT `_ItemsToWishlists_A_fkey` FOREIGN KEY (`A`) REFERENCES `Items`(`item_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

