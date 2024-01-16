/*
  Warnings:

  - You are about to drop the column `barcode` on the `Mygunplalist` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Mygunplalist` DROP COLUMN `barcode`;

-- CreateTable
CREATE TABLE `Item_status` (
    `item_status_id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_id` INTEGER NOT NULL,
    `mygunplalist_id` INTEGER NOT NULL,
    `status` ENUM('Garage', 'Assembling', 'Deployed') NOT NULL DEFAULT 'Garage',

    UNIQUE INDEX `Item_status_item_id_key`(`item_id`),
    UNIQUE INDEX `Item_status_mygunplalist_id_key`(`mygunplalist_id`),
    PRIMARY KEY (`item_status_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Users_email_key` ON `Users`(`email`);

-- AddForeignKey
ALTER TABLE `Item_status` ADD CONSTRAINT `Item_status_Items_item_id_fk` FOREIGN KEY (`item_id`) REFERENCES `Items`(`item_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Item_status` ADD CONSTRAINT `Item_status_Mygunplalist_mygunplalist_id_fk` FOREIGN KEY (`mygunplalist_id`) REFERENCES `Mygunplalist`(`mygunplalist_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
