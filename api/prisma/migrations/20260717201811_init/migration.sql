-- CreateTable
CREATE TABLE `User` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_edv` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `birthday` DATETIME(3) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'INSTRUCTOR', 'APPRENTICE') NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_user_edv_key`(`user_edv`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Class` (
    `class_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `Class_is_active_idx`(`is_active`),
    PRIMARY KEY (`class_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClassUser` (
    `class_user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `class_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `ClassUser_user_id_idx`(`user_id`),
    INDEX `ClassUser_class_id_idx`(`class_id`),
    UNIQUE INDEX `ClassUser_class_id_user_id_key`(`class_id`, `user_id`),
    PRIMARY KEY (`class_user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subject` (
    `subject_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `workload` INTEGER NOT NULL,
    `completed_workload` INTEGER NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NULL,
    `class_id` INTEGER NOT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `Subject_class_id_idx`(`class_id`),
    INDEX `Subject_is_active_idx`(`is_active`),
    PRIMARY KEY (`subject_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubjectInstructor` (
    `subject_instructor_id` INTEGER NOT NULL AUTO_INCREMENT,
    `subject_id` INTEGER NOT NULL,
    `instructor_id` INTEGER NOT NULL,

    INDEX `SubjectInstructor_subject_id_idx`(`subject_id`),
    INDEX `SubjectInstructor_instructor_id_idx`(`instructor_id`),
    UNIQUE INDEX `SubjectInstructor_subject_id_instructor_id_key`(`subject_id`, `instructor_id`),
    PRIMARY KEY (`subject_instructor_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubjectRoom` (
    `subject_room_id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_id` INTEGER NOT NULL,
    `subject_id` INTEGER NOT NULL,
    `priority` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `SubjectRoom_room_id_idx`(`room_id`),
    INDEX `SubjectRoom_subject_id_idx`(`subject_id`),
    UNIQUE INDEX `SubjectRoom_subject_id_priority_key`(`subject_id`, `priority`),
    UNIQUE INDEX `SubjectRoom_subject_id_room_id_key`(`subject_id`, `room_id`),
    PRIMARY KEY (`subject_room_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `event_id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `subject_instructor_id` INTEGER NULL,
    `class_id` INTEGER NULL,
    `recurrence_id` INTEGER NULL,
    `created_by` INTEGER NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `event_type` ENUM('LESSON', 'ASSESSMENT', 'FEEDBACK', 'EXTERNAL', 'PERSONAL', 'OTHER') NOT NULL,
    `is_blocked` BOOLEAN NOT NULL DEFAULT false,
    `status` ENUM('SCHEDULED', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'SCHEDULED',

    INDEX `Event_subject_instructor_id_idx`(`subject_instructor_id`),
    INDEX `Event_class_id_idx`(`class_id`),
    INDEX `Event_created_by_idx`(`created_by`),
    INDEX `Event_is_blocked_idx`(`is_blocked`),
    INDEX `Event_recurrence_id_idx`(`recurrence_id`),
    INDEX `Event_start_date_end_date_idx`(`start_date`, `end_date`),
    INDEX `Event_status_idx`(`status`),
    INDEX `Event_class_id_start_date_idx`(`class_id`, `start_date`),
    PRIMARY KEY (`event_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Recurrence` (
    `recurrence_id` INTEGER NOT NULL AUTO_INCREMENT,
    `series_name` VARCHAR(191) NOT NULL,
    `repeat_until` DATETIME(3) NULL,
    `occurrences` INTEGER NULL,
    `created_by` INTEGER NOT NULL,
    `monday` BOOLEAN NOT NULL DEFAULT false,
    `tuesday` BOOLEAN NOT NULL DEFAULT false,
    `wednesday` BOOLEAN NOT NULL DEFAULT false,
    `thursday` BOOLEAN NOT NULL DEFAULT false,
    `friday` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `Recurrence_created_by_idx`(`created_by`),
    PRIMARY KEY (`recurrence_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Room` (
    `room_id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `capacity` INTEGER NOT NULL,
    `description` VARCHAR(191) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Room_title_key`(`title`),
    INDEX `Room_is_active_idx`(`is_active`),
    PRIMARY KEY (`room_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reservation` (
    `reservation_id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NULL,
    `room_id` INTEGER NOT NULL,
    `event_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Reservation_event_id_key`(`event_id`),
    INDEX `Reservation_room_id_idx`(`room_id`),
    INDEX `Reservation_event_id_idx`(`event_id`),
    PRIMARY KEY (`reservation_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Participation` (
    `participation_id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `event_id` INTEGER NOT NULL,
    `status` ENUM('PENDING', 'CONFIRMED', 'DECLINED', 'ATTENDED', 'CANCELLED') NOT NULL,

    INDEX `Participation_user_id_idx`(`user_id`),
    INDEX `Participation_event_id_idx`(`event_id`),
    UNIQUE INDEX `Participation_user_id_event_id_key`(`user_id`, `event_id`),
    PRIMARY KEY (`participation_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ClassUser` ADD CONSTRAINT `ClassUser_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `Class`(`class_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClassUser` ADD CONSTRAINT `ClassUser_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subject` ADD CONSTRAINT `Subject_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `Class`(`class_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubjectInstructor` ADD CONSTRAINT `SubjectInstructor_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `Subject`(`subject_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubjectInstructor` ADD CONSTRAINT `SubjectInstructor_instructor_id_fkey` FOREIGN KEY (`instructor_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubjectRoom` ADD CONSTRAINT `SubjectRoom_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `Subject`(`subject_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubjectRoom` ADD CONSTRAINT `SubjectRoom_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `Room`(`room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_recurrence_id_fkey` FOREIGN KEY (`recurrence_id`) REFERENCES `Recurrence`(`recurrence_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_subject_instructor_id_fkey` FOREIGN KEY (`subject_instructor_id`) REFERENCES `SubjectInstructor`(`subject_instructor_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `Class`(`class_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Event` ADD CONSTRAINT `Event_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Recurrence` ADD CONSTRAINT `Recurrence_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `Room`(`room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `Event`(`event_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Participation` ADD CONSTRAINT `Participation_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Participation` ADD CONSTRAINT `Participation_event_id_fkey` FOREIGN KEY (`event_id`) REFERENCES `Event`(`event_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
