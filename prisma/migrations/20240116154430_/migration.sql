/*
  Warnings:

  - You are about to drop the `wishlistitems` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `wishlistitems` DROP FOREIGN KEY `WishlistItems_item_id_fkey`;

-- DropForeignKey
ALTER TABLE `wishlistitems` DROP FOREIGN KEY `WishlistItems_wishlist_id_fkey`;

-- DropTable
DROP TABLE `wishlistitems`;

-- CreateTable
CREATE TABLE `_ItemsToWishlists` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ItemsToWishlists_AB_unique`(`A`, `B`),
    INDEX `_ItemsToWishlists_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ItemsToWishlists` ADD CONSTRAINT `_ItemsToWishlists_A_fkey` FOREIGN KEY (`A`) REFERENCES `Items`(`item_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ItemsToWishlists` ADD CONSTRAINT `_ItemsToWishlists_B_fkey` FOREIGN KEY (`B`) REFERENCES `Wishlists`(`wishlist_id`) ON DELETE CASCADE ON UPDATE CASCADE;
