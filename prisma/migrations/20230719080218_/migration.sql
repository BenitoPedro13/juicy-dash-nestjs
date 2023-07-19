/*
  Warnings:

  - You are about to drop the column `userId` on the `Campaign` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[campaignId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `campaignId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Campaign` DROP FOREIGN KEY `Campaign_userId_fkey`;

-- AlterTable
ALTER TABLE `Campaign` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `campaignId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_campaignId_key` ON `User`(`campaignId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `Campaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
