import { CreateRecurrenceDTO } from "./RecurrenceDto.ts";

export interface ScheduleLessonsDTO {

    title: string;
    description?: string;

    createdBy: number;

    subjectInstructorId: number;
    roomId: number;

    startDate: Date;
    startHour: string;
    endHour: string;

    recurrence: CreateRecurrenceDTO;
}

export interface ScheduleLessonResponseDTO {
    recurrenceId: number;
    lessonsCreated: number;
    eventIds: number[];
}