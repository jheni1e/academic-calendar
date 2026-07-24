import { EventStatus, EventType, UserRole } from "../generated/prisma/enums.ts";
export interface CreateEventDTO {

    title: string;
    description?: string;

    eventType: EventType;

    subjectInstructorId?: number;
    classId?: number;
    recurrenceId?: number;
    roomId?: number;

    startDate: Date;
    endDate: Date;

    createdBy: number;
}

export interface UpdateEventDTO {

    title?: string;
    description?: string;

    eventType?: EventType;

    subjectInstructorId: number; // Cannot be undefined
    recurrenceId?: number;

    startDate: Date; // Cannot be undefined
    endDate: Date; // Cannot be undefined

    roomId?: number;
}

export interface EventResponseDTO {
    event_id: number;
    title: string;
    description: string | null;
    start_date: Date;
    end_date: Date;
    event_type: EventType;
    status: EventStatus;
    is_blocked: boolean;

    class: {
        class_id: number;
        name: string;
    } | null;

    recurrence: {
        recurrence_id: number;
        series_name: string;
        repeat_until: Date | null;
        occurrences: number | null;
        monday: boolean;
        tuesday: boolean;
        wednesday: boolean;
        thursday: boolean;
        friday: boolean;
    } | null;

    reservation: {
        room: {
            room_id: number;
            title: string;
            capacity: number;
        };
    } | null;

    subject_instructor: {
        subject: {
            subject_id: number;
            name: string;
        };
        instructor: {
            user_id: number;
            user_edv: number;
            name: string;
            role: UserRole;
        };
    } | null;
}