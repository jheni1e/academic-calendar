import { prisma } from "../../../lib/prisma.ts";
import { CreateParticipationDTO, ParticipationResponseDTO, UpdateParticipationDTO } from "../participationDTO.ts";
import { IParticipationRepository } from "./IParticipationRepository.ts";

export class ParticipationRepository
    implements IParticipationRepository {

        async create(data: CreateParticipationDTO): Promise<ParticipationResponseDTO> {
            return prisma.participation.create({
                data: {
                    user_id: data.user_id,
                    event_role_id: data.event_role_id,
                    event_id: data.event_id,
                    is_confirmed: data.is_confirmed ?? true
                }
            })
        }

        async update(participationId : number, data: UpdateParticipationDTO): Promise<ParticipationResponseDTO> {
            return prisma.participation.update({
                where: {
                    participationId : participationId
                },

                data: {
                    user_id: data.user_id,
                    event_role_id: data.event_role_id,
                    event_id: data.event_id,
                    is_confirmed: data.is_confirmed ?? true
                }
            })
        }

        async findAll(){
            return prisma.participation.findMany();
        }

        async findById(participationId: number): Promise<ParticipationResponseDTO> {
            return prisma.participation.findUnique({
                where: {
                    participationId : participationId
                }
            })
        }

        async delete(participationId: number): Promise<ParticipationResponseDTO> {
            return prisma.participation.delete({
                where: {
                    participationId : participationId
                }
            })
        }
    }