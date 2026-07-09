import { IReservationRepository } from "../repositories/IReservationRepository.ts";

export class FindReservationByIdUseCase {
    constructor(
        private readonly reservationRepository: IReservationRepository
    ) {}

    async execute(reservationId: number) {

        const reservation = await this.reservationRepository.findById(reservationId);

        if (!reservation) {
            throw new Error("Reserva não encontrada.");
        }

        return reservation;
    }
}