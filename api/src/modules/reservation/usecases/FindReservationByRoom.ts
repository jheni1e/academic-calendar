import { IReservationRepository } from "../repositories/IReservationRepository.ts";

export class FindReservationByRoomUseCase {
    constructor(
        private readonly reservationRepository: IReservationRepository
    ) {}

    async execute(roomId: number) {

        const reservation = await this.reservationRepository.findByRoom(roomId);

        if (!reservation) {
            throw new Error("Reserva não encontrada.");
        }

        return reservation;
    }
}