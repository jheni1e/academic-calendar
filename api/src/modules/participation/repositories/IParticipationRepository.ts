import {
    CreateParticipationDTO,
    ParticipationResponseDTO,
    UpdateParticipationDTO
} from "../ParticipationDTO.ts";

export interface IParticipationRepository {
    create(
        data: CreateParticipationDTO
    ): Promise<ParticipationResponseDTO>;

    findById(
        participationId: number
    ): Promise<ParticipationResponseDTO | null>;

    findByUserAndEvent(
        userId: number,
        eventId: number
    ): Promise<ParticipationResponseDTO | null>;

    findAll(): Promise<ParticipationResponseDTO[]>;

    update(
        participationId: number,
        data: UpdateParticipationDTO
    ): Promise<ParticipationResponseDTO>;

    delete(
        participationId: number
    ): Promise<void>;
}