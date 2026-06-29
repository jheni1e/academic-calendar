import { prisma } from "../../../lib/prisma.ts";
import { UpdateEventDTO } from "../../event/EventDto.ts";
import { CreateReservationDTO, UpdateReservationDTO } from "../reservationDto.ts";
import { IReservationRepository } from "./IReservationRepository.ts";

export class ReservationRepository
    implements IReservationRepository {
        async create(
            data : CreateReservationDTO
        ): Promise<Event> {

            return prisma.reservation.create({
                data: {
                    roomId: data.roomId,
                    eventId: data.eventId,
                    schedule_start: data.schedule_start,
                    schedule_end: data.schedule_end,
                    is_blocked: data.is_blocked ?? false,
                    is_confirmed: data.is_confirmed ?? true,
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
                    schedule_start: data.schedule_start,
                    schedule_end: data.schedule_end,
                    is_blocked: data.is_blocked ?? false,
                    is_confirmed: data.is_confirmed ?? true,
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