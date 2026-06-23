/*
  Warnings:

  - You are about to drop the `subjectresponsable` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[role_id,user_id]` on the table `Assignment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[class_id,user_id]` on the table `ClassUser` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,event_id]` on the table `Participation` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[event_id]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `subjectresponsable` DROP FOREIGN KEY `SubjectResponsable_instructor_id_fkey`;

-- DropForeignKey
ALTER TABLE `subjectresponsable` DROP FOREIGN KEY `SubjectResponsable_subject_id_fkey`;

-- DropTable
DROP TABLE `subjectresponsable`;

-- CreateTable
CREATE TABLE `SubjectResponsible` (
    `subject_responsable_id` INTEGER NOT NULL AUTO_INCREMENT,
    `subject_id` INTEGER NOT NULL,
    `instructor_id` INTEGER NOT NULL,

    UNIQUE INDEX `SubjectResponsible_subject_id_instructor_id_key`(`subject_id`, `instructor_id`),
    PRIMARY KEY (`subject_responsable_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Assignment_role_id_user_id_key` ON `Assignment`(`role_id`, `user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `ClassUser_class_id_user_id_key` ON `ClassUser`(`class_id`, `user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Participation_user_id_event_id_key` ON `Participation`(`user_id`, `event_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Reservation_event_id_key` ON `Reservation`(`event_id`);

-- AddForeignKey
ALTER TABLE `SubjectResponsible` ADD CONSTRAINT `SubjectResponsible_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `Subject`(`subject_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubjectResponsible` ADD CONSTRAINT `SubjectResponsible_instructor_id_fkey` FOREIGN KEY (`instructor_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
