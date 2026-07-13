import { prisma } from "../../../config/prisma.ts";
import {
    CreateParticipationDTO,
    ParticipationResponseDTO,
    UpdateParticipationDTO
} from "../ParticipationDTO.ts";
import { IParticipationRepository } from "./IParticipationRepository.ts";

export class PrismaParticipationRepository
    implements IParticipationRepository
{
    async create(
        data: CreateParticipationDTO
    ): Promise<ParticipationResponseDTO> {
        return await prisma.participation.create({
            data
        });
    }

    async update(
        participationId: number,
        data: UpdateParticipationDTO
    ): Promise<ParticipationResponseDTO> {
        return await prisma.participation.update({
            where: {
                participation_id: participationId
            },
            data
        });
    }

    async findAll(): Promise<ParticipationResponseDTO[]> {
        return await prisma.participation.findMany();
    }

    async findById(
        participationId: number
    ): Promise<ParticipationResponseDTO | null> {
        return await prisma.participation.findUnique({
            where: {
                participation_id: participationId
            }
        });
    }

    async findByUserAndEvent(
        userId: number,
        eventId: number
    ): Promise<ParticipationResponseDTO | null> {
    
        return await prisma.participation.findUnique({
            where: {
                user_event_unique: {
                    user_id: userId,
                    event_id: eventId
                }
            }
        });
    }

    async findByUser(userId: number): Promise<ParticipationResponseDTO[]> {

        return prisma.participation.findMany({
            where: {
                user_id: userId
            }
        });
    
    }
    
    async findByEvent(eventId: number): Promise<ParticipationResponseDTO[]> {
    
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