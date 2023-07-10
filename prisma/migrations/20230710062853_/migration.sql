-- CreateTable
CREATE TABLE `Tabela` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `influencer` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `posts` INTEGER NOT NULL,
    `impressions` INTEGER NOT NULL,
    `interactions` INTEGER NOT NULL,
    `clicks` INTEGER NOT NULL,
    `videoViews` INTEGER NOT NULL,
    `cpe` DOUBLE NOT NULL,
    `ctr` DOUBLE NOT NULL,
    `cpc` DOUBLE NOT NULL,
    `cpv` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
