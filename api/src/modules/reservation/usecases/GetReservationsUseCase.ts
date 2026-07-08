import { IReservationRepository } from "../repositories/IReservationRepository.ts";

export class GetReservationsUseCase {
    constructor(
        private readonly reservationRepository: IReservationRepository
    ) {}

    async execute() {

        return await this.reservationRepository.findAll();
    }
}