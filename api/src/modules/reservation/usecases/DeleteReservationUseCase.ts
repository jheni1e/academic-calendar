import { IReservationRepository } from "../repositories/IReservationRepository.ts";

export class DeleteReservationUseCase {
    constructor(
        private readonly reservationRepository: IReservationRepository
    ) {}

    async execute(reservationId: number) {

        const reservation = await this.reservationRepository.findById(reservationId);

        if (!reservation) {
            throw new Error("Reserva não encontrada.");
        }

        // Não permite excluir reservas bloqueadas
        if (reservation.is_blocked) {
            throw new Error("A reserva está bloqueada.");
        }

        await this.reservationRepository.delete(reservationId);
    }
}