export interface CreateLessonSeriesDTO {
    recurrenceId: number;

    subjectInstructorId: number;
    classId: number;

    startDate: Date;
    startHour: string;
    endHour: string;

    workload: number;
}

export interface ScheduleLessonsDTO {
    subjectInstructorId: number;
    recurrenceId: number;
    classId: number;
    createdBy: number;

    title: string;
    description?: string;

    startDate: Date;
    startHour: string;
    endHour: string;
}