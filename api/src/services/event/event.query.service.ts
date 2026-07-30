import { EventResponseDTO } from "../../dtos/EventDto.ts";
import { EventStatus, Prisma } from "../../generated/prisma/client.ts";
import { prisma } from "../../lib/prisma.ts";
import { completePendingLessons } from "../lesson-completion.service.ts";

export const EVENT_INCLUDE = {
    class: true,
    creator: true,
    recurrence: true,
    reservation: {
        include: {
            room: true
        }
    },
    subject_instructor: {
        include: {
            subject: true,
            instructor: true
        }
    }
} satisfies Prisma.EventInclude;

export type EventWithRelations =
    Prisma.EventGetPayload<{
        include: typeof EVENT_INCLUDE;
    }>;

// ---- CRUD ----

export const findEventById = async (
    eventId: number
): Promise<EventWithRelations | null> => {

    await completePendingLessons();

    return prisma.event.findUnique({
        where: {
            event_id: eventId
        },
        include: EVENT_INCLUDE
    });

};

export const findAllEvents = async (): Promise<EventResponseDTO[]> => {

    await completePendingLessons();
    
    return prisma.event.findMany({
        orderBy: {
            start_date: "asc"
        },
        select: {
            event_id: true,
            title: true,
            description: true,
            start_date: true,
            end_date: true,
            event_type: true,
            status: true,
            is_blocked: true,

            class: {
                select: {
                    class_id: true,
                    name: true
                }
            },

            recurrence: {
                select: {
                    recurrence_id: true,
                    series_name: true,
                    repeat_until: true,
                    occurrences: true,
                    monday: true,
                    tuesday: true,
                    wednesday: true,
                    thursday: true,
                    friday: true
                }
            },

            reservation: {
                select: {
                    room: {
                        select: {
                            room_id: true,
                            title: true,
                            capacity: true
                        }
                    }
                }
            },

            subject_instructor: {
                select: {
                    subject: {
                        select: {
                            subject_id: true,
                            name: true
                        }
                    },
                    instructor: {
                        select: {
                            user_id: true,
                            user_edv: true,
                            name: true,
                            role: true
                        }
                    }
                }
            }
        }
    });

};

export const findEventsByClass = async (
    classId: number
): Promise<EventWithRelations[]> => {

    await completePendingLessons();

    return prisma.event.findMany({
        where: {
            class_id: classId
        },
        orderBy: {
            start_date: "asc"
        },
        include: EVENT_INCLUDE
    });

};

export const findEventsByInstructor = async (
    instructorId: number
): Promise<EventWithRelations[]> => {

    await completePendingLessons();

    return prisma.event.findMany({
        where: {
            subject_instructor: {
                instructor_id: instructorId
            }
        },
        orderBy: {
            start_date: "asc"
        },
        include: EVENT_INCLUDE
    });

};

export const findEventsByRoom = async (
    roomId: number
): Promise<EventWithRelations[]> => {

    await completePendingLessons();

    return prisma.event.findMany({
        where: {
            reservation: {
                is: {
                    room_id: roomId
                }
            }
        },
        orderBy: {
            start_date: "asc"
        },
        include: EVENT_INCLUDE
    });

};

export const findEventsByUser = async (
    userId: number
): Promise<EventWithRelations[]> => {

    await completePendingLessons();

    return prisma.event.findMany({
        where: {
            participations: {
                some: {
                    user_id: userId
                }
            }
        },
        orderBy: {
            start_date: "asc"
        },
        include: EVENT_INCLUDE
    });

};

export const findConfirmedEvents = async (): Promise<EventResponseDTO[]> => {

    await completePendingLessons();

    return prisma.event.findMany({
        where: {
            status: {
                in: [
                    EventStatus.CONFIRMED,
                    EventStatus.COMPLETED
                ]
            }
        },
        orderBy: {
            start_date: "asc"
        },
        select: {
            event_id: true,
            title: true,
            description: true,
            start_date: true,
            end_date: true,
            event_type: true,
            status: true,
            is_blocked: true,

            class: {
                select: {
                    class_id: true,
                    name: true
                }
            },

            recurrence: {
                select: {
                    recurrence_id: true,
                    series_name: true,
                    repeat_until: true,
                    occurrences: true,
                    monday: true,
                    tuesday: true,
                    wednesday: true,
                    thursday: true,
                    friday: true
                }
            },

            reservation: {
                select: {
                    room: {
                        select: {
                            room_id: true,
                            title: true,
                            capacity: true
                        }
                    }
                }
            },

            subject_instructor: {
                select: {
                    subject: {
                        select: {
                            subject_id: true,
                            name: true
                        }
                    },
                    instructor: {
                        select: {
                            user_id: true,
                            user_edv: true,
                            name: true,
                            role: true
                        }
                    }
                }
            }
        }
    });

};