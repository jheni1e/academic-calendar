import { IReservationRepository } from "../repositories/IReservationRepository.ts";
import { CreateReservationDTO } from "../../../dtos/ReservationDTO.ts";

export class CreateReservationUseCase {
    constructor(
        private readonly reservationRepository: IReservationRepository
    ) {}

    async execute(data: CreateReservationDTO) {

        // Verifica se o horário é válido
        if (data.scheduleStart >= data.scheduleEnd) {
            throw new Error("A data de início deve ser anterior à data de término.");
        }

        // TODO: Verificar conflito de horário da sala

        // TODO: Verificar se a sala está ativa

        // TODO: Verificar se o evento existe

        return await this.reservationRepository.create(data);
    }
}