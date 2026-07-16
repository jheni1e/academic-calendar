import { IEventRepository } from "../repositories/IEventRepository.ts";
import { UpdateEventDTO } from "../../../dtos/EventDTO.ts";
import { NotFoundError } from "../../../shared/errors/NotFoundError.ts";
import { IReservationRepository } from "../../reservation/repositories/IReservationRepository.ts";
import { ReservationStatus } from "../../../generated/prisma/enums.ts";

export class UpdateEventUseCase {
    constructor(
        private readonly eventRepository: IEventRepository,
        private readonly reservationRepository: IReservationRepository
    ) {}

    async execute(eventId: number, data: UpdateEventDTO) {

        const event = await this.eventRepository.findById(eventId);
        const reservation = await this.reservationRepository.findByEvent(eventId);

        if (!event) {
            throw new NotFoundError("Event not found.");
        }

        if (data.title !== undefined && !data.title.trim()) {
            throw new Error("Event title is required.");
        }

        // TODO: Impedir edição caso exista reserva bloqueada
        // if (event.) {
        //     throw new Error("Event title is required.");
        // }       

        return await this.eventRepository.update(eventId, data);
    }
}