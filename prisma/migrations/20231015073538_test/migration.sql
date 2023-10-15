-- DropForeignKey
ALTER TABLE `issue` DROP FOREIGN KEY `Issue_companyEmployeeId_fkey`;

-- DropForeignKey
ALTER TABLE `issue` DROP FOREIGN KEY `Issue_serviceEmployeeId_fkey`;

-- AlterTable
ALTER TABLE `issue` MODIFY `companyEmployeeId` INTEGER NULL,
    MODIFY `serviceEmployeeId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_companyEmployeeId_fkey` FOREIGN KEY (`companyEmployeeId`) REFERENCES `CompanyEmployee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_serviceEmployeeId_fkey` FOREIGN KEY (`serviceEmployeeId`) REFERENCES `ServiceEmployee`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
