import { CreateParticipationDTO, ParticipationResponseDTO, UpdateParticipationDTO } from "../dtos/ParticipationDTO.ts";
import { EventStatus, EventType, Participation, ParticipationStatus } from "../generated/prisma/client.ts";
import { prisma } from "../lib/prisma.ts";
import { ConflictError } from "../shared/errors/ConflictError.ts";
import { NotFoundError } from "../shared/errors/NotFoundError.ts";

export const createParticipation = async (
    data: CreateParticipationDTO
): Promise<Participation> => {

    const event = await prisma.event.findUnique({
        where: {
            event_id: data.eventId
        }
    });

    if (!event) {
        throw new NotFoundError("Event not found.");
    }

    await validateConfirmedParticipantConflict(
        data.userId,
        event.start_date,
        event.end_date,
        event.event_id,
        event.event_type
    );

    return prisma.participation.create({
        data: {
            user_id: data.userId,
            event_id: data.eventId,
            status: ParticipationStatus.CONFIRMED
        }
    });
}

export const updateParticipation = async (
    participationId: number,
    data: UpdateParticipationDTO
): Promise<Participation> => {

    return prisma.participation.update({
        where: {
            participation_id: participationId
        },
        data: {
            ...(data.status !== undefined && {
                status: data.status
            })
        }
    });

}

export const findAllParticipations = async (): Promise<Participation[]> => {

    return prisma.participation.findMany();

}

export const findParticipationById = async (
    participationId: number
): Promise<Participation | null> => {

    return prisma.participation.findUnique({
        where: {
            participation_id: participationId
        }
    });

}

export const findParticipationByUserAndEvent = async (
    userId: number,
    eventId: number
): Promise<Participation | null> => {

    return prisma.participation.findUnique({
        where: {
            user_event_unique: {
                user_id: userId,
                event_id: eventId
            }
        }
    });

}

export const findParticipationByUser = async (
    userId: number
): Promise<Participation[]> => {

    return prisma.participation.findMany({
        where: {
            user_id: userId
        }
    });

}

export const findParticipationByEvent = async (
    eventId: number
): Promise<ParticipationResponseDTO[]> => {

    const participations = await prisma.participation.findMany({
        where: {
            event_id: eventId
        },
        select: {
            participation_id: true,
            status: true,

            user: {
                select: {
                    name: true,
                    user_id: true
                }
            },
            event: {
                select: {
                    title: true,
                    event_id: true
                }
            }
        }
    });

    return participations.map(participation => ({
        participationId: participation.participation_id,
        eventId: participation.event.event_id,
        eventName: participation.event.title,
        userId: participation.user.user_id,
        userName: participation.user.name,
        status: participation.status

    }));

}

export const deleteParticipation = async (
    participationId: number
): Promise<void> => {

    await prisma.participation.delete({
        where: {
            participation_id: participationId
        }
    });

}

export const confirmParticipation = async (
    participationId: number,
    userId: number
) => {

    const participation = await prisma.participation.findFirst({
        where: {
            participation_id: participationId,
            user_id: userId
        },
        include: {
            event: true
        }
    });

    if (!participation) {
        throw new NotFoundError("Participation not found.");
    }
    
    if (participation.status === ParticipationStatus.CONFIRMED) {
    return participation;
    }

    await validateConfirmedParticipantConflict(
        participation.user_id,
        participation.event.start_date,
        participation.event.end_date,
        participation.event.event_id,
        participation.event.event_type
    );

    return prisma.participation.update({
        where: {
            participation_id: participationId
        },
        data: {
            status: ParticipationStatus.CONFIRMED
        }
    });
}

export const declineParticipation = async (
    eventId: number,
    userId: number
): Promise<void> => {
    
    const participation = await prisma.participation.findUnique({
        where: {
            user_event_unique: {
                event_id: eventId,
                user_id: userId
            }
        }
    })

    if(participation) {
         await prisma.participation.update({
            where: {
                participation_id: participation.participation_id
            },
            data: {
                status: ParticipationStatus.DECLINED
            }
        })
    }
}

const validateConfirmedParticipantConflict = async (
    userId: number,
    start: Date,
    end: Date,
    eventId: number,
    eventType: EventType
): Promise<void> => {

    const conflict = await prisma.participation.findFirst({
        where: {
            user_id: userId,
            status: ParticipationStatus.CONFIRMED,
            event: {
                event_id: {
                    not: eventId
                },
                status: {
                    in: [
                        EventStatus.SCHEDULED,
                        EventStatus.CONFIRMED
                    ]
                },
                start_date: {
                    lt: end
                },
                end_date: {
                    gt: start
                }
            }
        },
        include: {
            event: true
        }
    });

    if (!conflict) return;

    const canOverlap =
        (
            eventType === EventType.FEEDBACK &&
            (
                conflict.event.event_type === EventType.LESSON ||
                conflict.event.event_type === EventType.INTERNSHIP
            )
        ) ||
        (
            conflict.event.event_type === EventType.FEEDBACK &&
            (
                eventType === EventType.LESSON ||
                eventType === EventType.INTERNSHIP
            )
        );
    
    if (canOverlap) {
        return;
    }
    
    throw new ConflictError(
        "You already have another confirmed event during this period."
    );
}
