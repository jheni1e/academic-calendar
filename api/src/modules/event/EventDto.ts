export interface CreateEventDTO {
    title: string;
    description?: string;
    subjectId?: number;
    eventTypeId: number;
}

export interface UpdateEventDTO {
    title?: string;
    description?: string;
    subjectId?: number;
    eventTypeId?: number;
}

// export interface EventResponseDTO {

//     eventId: number;

//     title: string;
//     description?: string;

//     createdAt: Date;

//     subject?: {
//         subjectId: number;
//         name: string;
//     };

//     eventType: {
//         eventTypeId: number;
//         name: string;
//     };
// }