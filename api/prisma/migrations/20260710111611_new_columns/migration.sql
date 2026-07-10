/*
  Warnings:

  - A unique constraint covering the columns `[subject_id,room_id]` on the table `SubjectRoom` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `SubjectRoom_subject_id_room_id_key` ON `SubjectRoom`(`subject_id`, `room_id`);
