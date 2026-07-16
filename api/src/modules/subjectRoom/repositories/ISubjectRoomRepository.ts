import { SubjectRoom } from "../../../generated/prisma/client.ts";
import {
    CreateSubjectRoomDTO,
    UpdateSubjectRoomDTO
} from "../../../dtos/SubjectRoomDTO.ts";

export interface ISubjectRoomRepository {

    create(
        data: CreateSubjectRoomDTO
    ): Promise<SubjectRoom>;

    findById(
        subjectRoomId: number
    ): Promise<SubjectRoom | null>;

    findBySubject(
        subjectId: number
    ): Promise<SubjectRoom[]>;

    findByRoom(
        roomId: number
    ): Promise<SubjectRoom[]>;

    findBySubjectAndRoom(
        subjectId: number,
        roomId: number
    ): Promise<SubjectRoom | null>;

    findAll(): Promise<SubjectRoom[]>;

    update(
        subjectRoomId: number,
        data: UpdateSubjectRoomDTO
    ): Promise<SubjectRoom>;

    delete(
        subjectRoomId: number
    ): Promise<void>;
}