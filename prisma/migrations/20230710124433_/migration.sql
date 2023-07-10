/*
  Warnings:

  - You are about to alter the column `cpe` on the `Tabela` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.
  - You are about to alter the column `ctr` on the `Tabela` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.
  - You are about to alter the column `cpc` on the `Tabela` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.
  - You are about to alter the column `cpv` on the `Tabela` table. The data in that column could be lost. The data in that column will be cast from `Double` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Tabela` MODIFY `posts` VARCHAR(191) NOT NULL,
    MODIFY `impressions` VARCHAR(191) NOT NULL,
    MODIFY `interactions` VARCHAR(191) NOT NULL,
    MODIFY `clicks` VARCHAR(191) NOT NULL,
    MODIFY `videoViews` VARCHAR(191) NOT NULL,
    MODIFY `cpe` VARCHAR(191) NOT NULL,
    MODIFY `ctr` VARCHAR(191) NOT NULL,
    MODIFY `cpc` VARCHAR(191) NOT NULL,
    MODIFY `cpv` VARCHAR(191) NOT NULL;
