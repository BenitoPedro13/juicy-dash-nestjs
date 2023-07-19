/*
  Warnings:

  - You are about to drop the column `campaignId` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `campaignId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Campaign` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Campaign` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Attachment` DROP FOREIGN KEY `Attachment_campaignId_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_campaignId_fkey`;

-- AlterTable
ALTER TABLE `Attachment` DROP COLUMN `campaignId`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Campaign` ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Performance` ADD COLUMN `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `campaignId`;

-- CreateIndex
CREATE UNIQUE INDEX `Campaign_userId_key` ON `Campaign`(`userId`);

-- AddForeignKey
ALTER TABLE `Campaign` ADD CONSTRAINT `Campaign_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Performance` ADD CONSTRAINT `Performance_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attachment` ADD CONSTRAINT `Attachment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
