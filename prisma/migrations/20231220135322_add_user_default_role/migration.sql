-- AlterTable
ALTER TABLE `Users` MODIFY `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user';
