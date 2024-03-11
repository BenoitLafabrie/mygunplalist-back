-- DropForeignKey
ALTER TABLE `Item_status` DROP FOREIGN KEY `Item_status_Items_item_id_fk`;

-- DropForeignKey
ALTER TABLE `Item_status` DROP FOREIGN KEY `Item_status_Mygunplalist_mygunplalist_id_fk`;

-- AddForeignKey
ALTER TABLE `Item_status` ADD CONSTRAINT `Item_status_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `Items`(`item_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Item_status` ADD CONSTRAINT `Item_status_mygunplalist_id_fkey` FOREIGN KEY (`mygunplalist_id`) REFERENCES `Mygunplalist`(`mygunplalist_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
