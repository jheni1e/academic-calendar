-- AlterTable
ALTER TABLE `subject` ADD COLUMN `scheduled_workload` INTEGER NOT NULL DEFAULT 0,
    MODIFY `completed_workload` INTEGER NOT NULL DEFAULT 0;
