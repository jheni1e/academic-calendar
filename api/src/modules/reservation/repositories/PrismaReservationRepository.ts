import { Reservation } from "../../../generated/prisma/client.ts";
import { prisma } from "../../../lib/prisma.ts";
import { CreateReservationDTO, UpdateReservationDTO } from "../reservationDto.ts";
import { IReservationRepository } from "./IReservationRepository.ts";

export class PrismaReservationRepository
    implements IReservationRepository {
        async create(
            data : CreateReservationDTO
        ): Promise<Reservation> {

            return prisma.reservation.create({
                data: {
                    roomId: data.roomId,
                    eventId: data.eventId,
                    schedule_start: data.scheduleStart,
                    schedule_end: data.scheduleEnd,
                    is_blocked: isBlocked ?? false,
                    is_confirmed: data.isConfirmed ?? true,
                    description: data.description
                }
            });
        }

        async update(
            reservationId: number,
            data: UpdateReservationDTO): Promise<Reservation> {
                
            return prisma.reservation.update({
                where: {
                    reservation_id : reservationId
                },

                data : {
                    event_id : data.roomId,
                    schedule_start: data.scheduleStart,
                    schedule_end: data.scheduleEnd,
                    is_blocked: data.isBlocked ?? false,
                    is_confirmed: data.isConfirmed ?? true,
                    description: data.description
                }
            })
        }

        async findAll(): Promise<Reservation[]> {
            return prisma.reservation.findMany();
        }

        async findById(reservationId: number): Promise<Reservation | null> {
            return prisma.reservation.findUnique({
                where: {
                    reservation_id : reservationId
                }
            })
        }

        async delete(reservationId: number): Promise<void> {
            return prisma.reservation.delete({
                where: {
                    reservation_id : reservationId
                }
            })
        }
    }