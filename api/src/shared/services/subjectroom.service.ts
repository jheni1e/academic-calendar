import { SubjectRoom } from "../../generated/prisma/client.ts";
import { prisma } from "../../lib/prisma.ts";
import { CreateSubjectRoomDTO, UpdateSubjectRoomDTO } from "../../modules/subjectRoom/SubjectRoomDTO.ts";

export const createSubjecRoom = async (
    data: CreateSubjectRoomDTO
): Promise<SubjectRoom> => {

    return prisma.subjectRoom.create({
        data: {
            subject_id: data.subjectId,
            room_id: data.roomId,
            priority: data.priority
        }
    });
}

export const findSubjecRoomById = async (
    subjectRoomId: number
): Promise<SubjectRoom | null> => {

    return prisma.subjectRoom.findUnique({
        where: {
            subject_room_id: subjectRoomId
        }
    });
}

export const findSubjecRoomBySubject = async (
    subjectId: number
): Promise<SubjectRoom[]> =>{

    return prisma.subjectRoom.findMany({
        where: {
            subject_id: subjectId
        }
    });
}

export const findSubjecRoomByRoom = async (
    roomId: number
): Promise<SubjectRoom[]> => {

    return prisma.subjectRoom.findMany({
        where: {
            room_id: roomId
        }
    });
}

export const findSubjecRoomBySubjectAndRoom = async (
    subjectId: number,
    roomId: number
): Promise<SubjectRoom | null> => {

    return prisma.subjectRoom.findUnique({
        where: {
            subject_id_room_id: {
                subject_id: subjectId,
                room_id: roomId
            }
        }
    });
}

export const findAllSubjecRooms = async (): Promise<SubjectRoom[]> => {

    return prisma.subjectRoom.findMany();
}

export const UpdateSubjectRoom = async (
    subjectRoomId: number,
    data: UpdateSubjectRoomDTO
): Promise<SubjectRoom> => {

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

export const DeleteSubjecRoom = async (
    subjectRoomId: number
): Promise<void> => {

    await prisma.subjectRoom.delete({
        where: {
            subject_room_id: subjectRoomId
        }
    });
}