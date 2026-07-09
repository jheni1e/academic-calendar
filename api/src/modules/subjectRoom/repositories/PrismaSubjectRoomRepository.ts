import { SubjectRoom } from "../../../generated/prisma/client.ts";
import { prisma } from "../../../lib/prisma.ts";

import {
    CreateSubjectRoomDTO,
    UpdateSubjectRoomDTO
} from "../SubjectRoomDTO.ts";

import { ISubjectRoomRepository } from "./ISubjectRoomRepository.ts";

export class PrismaSubjectRoomRepository
    implements ISubjectRoomRepository {

    async create(
        data: CreateSubjectRoomDTO
    ): Promise<SubjectRoom> {

        return prisma.subjectRoom.create({
            data: {
                subject_id: data.subjectId,
                room_id: data.roomId,
                priority: data.priority
            }
        });
    }

    async findById(
        subjectRoomId: number
    ): Promise<SubjectRoom | null> {

        return prisma.subjectRoom.findUnique({
            where: {
                subject_room_id: subjectRoomId
            }
        });
    }

    async findBySubject(
        subjectId: number
    ): Promise<SubjectRoom[]> {

        return prisma.subjectRoom.findMany({
            where: {
                subject_id: subjectId
            }
        });
    }

    async findByRoom(
        roomId: number
    ): Promise<SubjectRoom[]> {

        return prisma.subjectRoom.findMany({
            where: {
                room_id: roomId
            }
        });
    }

    async findBySubjectAndRoom(
        subjectId: number,
        roomId: number
    ): Promise<SubjectRoom | null> {
    
        return prisma.subjectRoom.findUnique({
            where: {
                subject_id_room_id: {
                    subject_id: subjectId,
                    room_id: roomId
                }
            }
        });
    }
    async findAll(): Promise<SubjectRoom[]> {

        return prisma.subjectRoom.findMany();
    }

    async update(
        subjectRoomId: number,
        data: UpdateSubjectRoomDTO
    ): Promise<SubjectRoom> {

        return prisma.subjectRoom.update({
            where: {
                subject_room_id: subjectRoomId
            },
            data: {
                subject_id: data.subjectId,
                room_id: data.roomId,
                priority: data.priority
            }
        });
    }

    async delete(
        subjectRoomId: number
    ): Promise<void> {

        await prisma.subjectRoom.delete({
            where: {
                subject_room_id: subjectRoomId
            }
        });
    }
}