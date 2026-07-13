import { prisma } from "../../../lib/prisma.ts";
import { CreateReservationDTO, UpdateReservationDTO } from "../reservationDto.ts";
import { IReservationRepository } from "./IReservationRepository.ts";

export class PrismaReservationRepository
    implements IReservationRepository {
        async create(
            data : CreateReservationDTO
        ): Promise<Event> {

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
            data: UpdateReservationDTO): Promise<Event> {
                
            return prisma.reservation.update({
                where: {
                    reservationId : reservationId
                },

                data : {
                    eventId : data.roomId,
                    schedule_start: data.scheduleStart,
                    schedule_end: data.scheduleEnd,
                    is_blocked: data.isBlocked ?? false,
                    is_confirmed: data.isConfirmed ?? true,
                    description: data.description
                }
            })
        }

        async findAll(): Promise<Event> {
            return prisma.reservation.findMany();
        }

        async findById(reservationId: number): Promise<Event> {
            return prisma.reservation.findUnique({
                where: {
                    reservationId : reservationId
                }
            })
        }

        async delete(reservationId: number): Promise<Event> {
            return prisma.reservation.delete({
                where: {
                    reservationId : reservationId
                }
            })
        }
    }