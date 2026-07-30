import { prisma } from "../lib/prisma.ts";
import { CreateClassDTO, UpdateClassDTO } from "../dtos/ClassDto.ts";
import { Class } from "../generated/prisma/client.ts";
import { NotFoundError } from "../shared/errors/NotFoundError.ts";
import { Event } from "../generated/prisma/client.ts";
import { EventResponseDTO } from "../dtos/EventDto.ts";

export const createClass = async (
    data: CreateClassDTO
): Promise<Class> => {

    return prisma.class.create({
        data: {
            name: data.name,
            is_active: data.isActive ?? true
        }
    });
}

export const findClassById = async (
    classId: number
): Promise<Class | null> => {

    return await prisma.class.findUnique({
        where: {
            class_id: classId
        }
    });
}

export const findAllClasses = async (): Promise<Class[]> => {

    return prisma.class.findMany();
}

export const updateClass = async (
    classId: number,
    data: UpdateClassDTO
): Promise<Class> => {

    return await prisma.class.update({
        where: {
            class_id: classId
        },
        data: {
            name: data.name,
            is_active: data.isActive
        }
    });

}

export const deleteClass = async(
    classId: number
): Promise<void> => {

    await prisma.class.delete({
        where: {
            class_id: classId
        }
    });
}

export const getEventsByClass = async (
    classId: number
): Promise<EventResponseDTO[]> => {

    return prisma.event.findMany({
        where: {
            class_id: classId
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
            },

            participations: {
                select: {
                    participation_id: true,
                    status: true,

                    user: {
                        select: {
                            user_id: true,
                            name: true,
                            user_edv: true
                        }
                    }
                }
            },

            creator: {
                select: {
                    user_id: true,
                    name: true,
                    user_edv: true
                }
            }
        }
    });
};