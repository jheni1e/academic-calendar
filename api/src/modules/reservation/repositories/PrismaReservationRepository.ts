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
                    room_id: data.roomId,
                    event_id: data.eventId,
                    schedule_start: data.scheduleStart,
                    schedule_end: data.scheduleEnd,
                    status: data.status,
                    is_blocked: data.isBlocked ?? false,
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

                data: {
                    room_id: data.roomId,
                    event_id: data.eventId,
                    schedule_start: data.scheduleStart,
                    schedule_end: data.scheduleEnd,
                    status: data.status,
                    is_blocked: data.isBlocked,
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

        async findByRoom(roomId : number) : Promise<Reservation[] | null> {
            return prisma.reservation.findMany({
                where: {
                    room_id : roomId
                }
            })
        }
        async delete(reservationId: number): Promise<void> {
            await prisma.reservation.delete({
                where: {
                    reservation_id : reservationId
                }
            })
        }
    }