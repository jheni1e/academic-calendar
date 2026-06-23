import { UpdateEventDTO } from "../../event/EventDto.ts";
import { CreateReservationDTO } from "../reservationDto.ts";

export interface IReservationRepository {
    create(data: CreateReservationDTO) : Promise<Event>;

    findById(reservationId: number) : Promise<Event>;

    findAll() : Promise<Event>;

    update(
        reservationId: number,
        data: UpdateEventDTO
    ) : Promise<Event>;

    delete(reservationId: number) : Promise<Event>;
}