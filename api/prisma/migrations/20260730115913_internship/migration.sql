/*
  Warnings:

  - The values [OTHER] on the enum `Event_event_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `event` MODIFY `event_type` ENUM('LESSON', 'ASSESSMENT', 'FEEDBACK', 'EXTERNAL', 'PERSONAL', 'INTERNSHIP') NOT NULL;
