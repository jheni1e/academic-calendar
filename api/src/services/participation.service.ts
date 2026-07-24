import { CreateParticipationDTO, UpdateParticipationDTO } from "../dtos/ParticipationDTO.ts";
import { Participation } from "../generated/prisma/client.ts";
import { prisma } from "../lib/prisma.ts";

export const createParticipation = async (
    data: CreateParticipationDTO
): Promise<Participation> => {

    return prisma.participation.create({
        data: {
            user_id: data.userId,
            event_id: data.eventId
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
): Promise<Participation[]> => {

    return prisma.participation.findMany({
        where: {
            event_id: eventId
        }
    });

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
                status: "CONFIRMED"
            }
        })
    }
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
                status: "DECLINED"
            }
        })
    }
}

