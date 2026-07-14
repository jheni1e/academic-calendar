import { ForbiddenError } from "../../../shared/errors/ForbiddenError.ts";
import { NotFoundError } from "../../../shared/errors/NotFoundError.ts";
import { IReservationRepository } from "../../reservation/repositories/IReservationRepository.ts";
import { IEventRepository } from "../repositories/IEventRepository.ts";

export class DeleteEventUseCase {
    constructor(
        private readonly eventRepository: IEventRepository,
        private readonly reservationRepository: IReservationRepository,
    ) {}

    async execute(eventId: number) {
        
        const event = await this.eventRepository.findById(eventId);

        if (!event) {
            throw new NotFoundError("Event not found.");
        }
        
        const reservation =
            await this.reservationRepository.findByEvent(eventId);
        
        if (reservation) {
            throw new ForbiddenError(
                "Cannot delete an event with a reservation."
            );
        }
        
        await this.eventRepository.delete(eventId);
    }
}