import { CreateReservationDTO, UpdateReservationDTO } from "../reservationDto.ts";
import { Reservation } from "../../../generated/prisma/client.ts";
export interface IReservationRepository {
    create(data: CreateReservationDTO) : Promise<Reservation>;

    findById(reservationId: number) : Promise<Reservation | null>;
    
    findByEvent(
        eventId: number
    ): Promise<Reservation | null>;

    findAll() : Promise<Reservation[]>;

    update(
        reservationId: number,
        data: UpdateReservationDTO
    ) : Promise<Reservation>;

    delete(reservationId: number) : Promise<void>;
}