-- CreateTable
CREATE TABLE `TypeMovement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TypeMovement_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CashMovement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `association` VARCHAR(191) NOT NULL,
    `budgetId` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `cash` DECIMAL(10, 2) NOT NULL,
    `dateToPay` DATE NULL,
    `typeMovementId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Budget` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `cash` DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CashMovement` ADD CONSTRAINT `CashMovement_budgetId_fkey` FOREIGN KEY (`budgetId`) REFERENCES `Budget`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CashMovement` ADD CONSTRAINT `CashMovement_typeMovementId_fkey` FOREIGN KEY (`typeMovementId`) REFERENCES `TypeMovement`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
