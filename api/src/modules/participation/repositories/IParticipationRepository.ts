import {
    Participation
} from "../../../generated/prisma/client.ts";

import {
    CreateParticipationDTO,
    UpdateParticipationDTO
} from "../../../dtos/ParticipationDTO.ts";

export interface IParticipationRepository {

    create(
        data: CreateParticipationDTO
    ): Promise<Participation>;

    findById(
        participationId: number
    ): Promise<Participation | null>;

    findByUserAndEvent(
        userId: number,
        eventId: number
    ): Promise<Participation | null>;

    findByUser(
        userId: number
    ): Promise<Participation[]>;

    findByEvent(
        eventId: number
    ): Promise<Participation[]>;

    findAll(): Promise<Participation[]>;

    update(
        participationId: number,
        data: UpdateParticipationDTO
    ): Promise<Participation>;

    delete(
        participationId: number
    ): Promise<void>;

}