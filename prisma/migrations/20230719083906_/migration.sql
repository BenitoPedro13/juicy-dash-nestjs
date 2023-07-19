/*
  Warnings:

  - You are about to drop the column `campaignId` on the `Performance` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Attachment` will be added. If there are existing duplicate values, this will fail.
  - Made the column `userId` on table `Performance` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Performance` DROP FOREIGN KEY `Performance_campaignId_fkey`;

-- DropForeignKey
ALTER TABLE `Performance` DROP FOREIGN KEY `Performance_userId_fkey`;

-- AlterTable
ALTER TABLE `Performance` DROP COLUMN `campaignId`,
    MODIFY `userId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Attachment_userId_key` ON `Attachment`(`userId`);

-- AddForeignKey
ALTER TABLE `Performance` ADD CONSTRAINT `Performance_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
