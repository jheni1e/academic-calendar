/*
  Warnings:

  - The values [CONRFIMED] on the enum `Participation_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `participation` MODIFY `status` ENUM('PENDING', 'CONFIRMED', 'DECLINED', 'ATTENDED', 'CANCELLED') NOT NULL DEFAULT 'PENDING';
