/*
  Warnings:

  - You are about to drop the column `userId` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Performance` table. All the data in the column will be lost.
  - Added the required column `campaignId` to the `Attachment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Attachment` DROP FOREIGN KEY `Attachment_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Performance` DROP FOREIGN KEY `Performance_userId_fkey`;

-- AlterTable
ALTER TABLE `Attachment` DROP COLUMN `userId`,
    ADD COLUMN `campaignId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Performance` DROP COLUMN `userId`;

-- AddForeignKey
ALTER TABLE `Attachment` ADD CONSTRAINT `Attachment_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `Campaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
