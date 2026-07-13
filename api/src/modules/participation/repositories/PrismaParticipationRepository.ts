import { prisma } from "../../../lib/prisma.ts";

import {
    Participation
} from "../../../generated/prisma/client.ts";

import {
    CreateParticipationDTO,
    UpdateParticipationDTO
} from "../ParticipationDTO.ts";

import { IParticipationRepository } from "./IParticipationRepository.ts";

export class PrismaParticipationRepository
    implements IParticipationRepository
{

    async create(
        data: CreateParticipationDTO
    ): Promise<Participation> {

        return prisma.participation.create({
            data: {
                user_id: data.userId,
                event_role_id: data.eventRoleId,
                event_id: data.eventId,
                status: data.status
            }
        });

    }

    async update(
        participationId: number,
        data: UpdateParticipationDTO
    ): Promise<Participation> {

        return prisma.participation.update({
            where: {
                participation_id: participationId
            },
            data: {
                ...(data.eventRoleId !== undefined && {
                    event_role_id: data.eventRoleId
                }),
                ...(data.status !== undefined && {
                    status: data.status
                })
            }
        });

    }

    async findAll(): Promise<Participation[]> {

        return prisma.participation.findMany();

    }

    async findById(
        participationId: number
    ): Promise<Participation | null> {

        return prisma.participation.findUnique({
            where: {
                participation_id: participationId
            }
        });

    }

    async findByUserAndEvent(
        userId: number,
        eventId: number
    ): Promise<Participation | null> {

        return prisma.participation.findUnique({
            where: {
                user_event_unique: {
                    user_id: userId,
                    event_id: eventId
                }
            }
        });

    }

    async findByUser(
        userId: number
    ): Promise<Participation[]> {

        return prisma.participation.findMany({
            where: {
                user_id: userId
            }
        });

    }

    async findByEvent(
        eventId: number
    ): Promise<Participation[]> {

        return prisma.participation.findMany({
            where: {
                event_id: eventId
            }
        });

    }

    async delete(
        participationId: number
    ): Promise<void> {

        await prisma.participation.delete({
            where: {
                participation_id: participationId
            }
        });

    }

}