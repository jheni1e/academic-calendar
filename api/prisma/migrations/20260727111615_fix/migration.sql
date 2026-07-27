/*
  Warnings:

  - The values [CONFIRMED] on the enum `Participation_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `participation` MODIFY `status` ENUM('PENDING', 'CONRFIMED', 'DECLINED', 'ATTENDED', 'CANCELLED') NOT NULL DEFAULT 'PENDING';
