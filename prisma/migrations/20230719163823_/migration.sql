/*
  Warnings:

  - You are about to drop the column `userId` on the `Performance` table. All the data in the column will be lost.
  - You are about to drop the `Campaign` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Metric` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userEmail` to the `Performance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `campaignName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estimated_executed_investment` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_initial_investment` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Campaign` DROP FOREIGN KEY `Campaign_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Metric` DROP FOREIGN KEY `Metric_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Performance` DROP FOREIGN KEY `Performance_userId_fkey`;

-- AlterTable
ALTER TABLE `Performance` DROP COLUMN `userId`,
    ADD COLUMN `userEmail` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `campaignName` VARCHAR(191) NOT NULL,
    ADD COLUMN `estimated_executed_investment` DOUBLE NOT NULL,
    ADD COLUMN `total_initial_investment` DOUBLE NOT NULL;

-- DropTable
DROP TABLE `Campaign`;

-- DropTable
DROP TABLE `Metric`;

-- CreateTable
CREATE TABLE `Attachments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uniqueFilename` VARCHAR(191) NOT NULL,
    `originalFilename` VARCHAR(191) NOT NULL,
    `fileSize` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userEmail` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Performance` ADD CONSTRAINT `Performance_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attachments` ADD CONSTRAINT `Attachments_userEmail_fkey` FOREIGN KEY (`userEmail`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
