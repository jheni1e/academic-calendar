import { IReservationRepository } from "../repositories/IReservationRepository.ts";
import { UpdateReservationDTO } from "../../../dtos/ReservationDTO.ts";
export class UpdateReservationUseCase {
    constructor(
        private readonly reservationRepository: IReservationRepository
    ) {}

    async execute(reservationId: number, data: UpdateReservationDTO) {

        // Busca a reserva
        const reservation = await this.reservationRepository.findById(reservationId);

        if (!reservation) {
            throw new Error("Reserva não encontrada.");
        }

        // Não permite editar reservas bloqueadas
        if (reservation.is_blocked) {
            throw new Error("A reserva está bloqueada.");
        }

        // Valida o período caso tenha sido alterado
        const start = data.scheduleStart ?? reservation.schedule_start;
        const end = data.scheduleEnd ?? reservation.schedule_end;

        if (start >= end) {
            throw new Error("A data de início deve ser anterior à data de término.");
        }

        // TODO: Verificar conflito de horário

        return await this.reservationRepository.update(reservationId, data);
    }
}