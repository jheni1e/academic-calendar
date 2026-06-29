import { CreateParticipationDTO, ParticipationResponseDTO, UpdateParticipationDTO } from "../ParticipationDTO.ts";


export interface IParticipationRepository {
    create(data: CreateParticipationDTO) : Promise<ParticipationResponseDTO>,
    update(participationId : number, data: UpdateParticipationDTO) : Promise<ParticipationResponseDTO>,
    findAll() : Promise<ParticipationResponseDTO>,
    findById(participationId : number) : Promise<ParticipationResponseDTO>,
    delete(participationId : number) : Promise<ParticipationResponseDTO>
}