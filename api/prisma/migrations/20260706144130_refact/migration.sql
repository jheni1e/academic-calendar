/*
  Warnings:

  - You are about to drop the `feature` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roomfeature` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subjectrequirement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `roomfeature` DROP FOREIGN KEY `RoomFeature_feature_id_fkey`;

-- DropForeignKey
ALTER TABLE `roomfeature` DROP FOREIGN KEY `RoomFeature_room_id_fkey`;

-- DropForeignKey
ALTER TABLE `subjectrequirement` DROP FOREIGN KEY `SubjectRequirement_feature_id_fkey`;

-- DropForeignKey
ALTER TABLE `subjectrequirement` DROP FOREIGN KEY `SubjectRequirement_subject_id_fkey`;

-- DropTable
DROP TABLE `feature`;

-- DropTable
DROP TABLE `roomfeature`;

-- DropTable
DROP TABLE `subjectrequirement`;

-- CreateTable
CREATE TABLE `SubjectRoom` (
    `subject_room_id` INTEGER NOT NULL AUTO_INCREMENT,
    `priority` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `room_id` INTEGER NOT NULL,
    `subject_id` INTEGER NOT NULL,

    INDEX `SubjectRoom_room_id_idx`(`room_id`),
    INDEX `SubjectRoom_subject_id_idx`(`subject_id`),
    PRIMARY KEY (`subject_room_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SubjectRoom` ADD CONSTRAINT `SubjectRoom_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `Subject`(`subject_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubjectRoom` ADD CONSTRAINT `SubjectRoom_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `Room`(`room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
