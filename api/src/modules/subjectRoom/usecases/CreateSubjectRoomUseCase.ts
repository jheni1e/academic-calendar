import { ISubjectRoomRepository } from "../repositories/ISubjectRoomRepository.ts";
import { CreateSubjectRoomDTO } from "../SubjectRoomDTO.ts";

export class CreateSubjectRoomUseCase {
    constructor(
        private readonly subjectRoomRepository: ISubjectRoomRepository
    ) {}

    async execute(data: CreateSubjectRoomDTO) {

        const subjectRoom =
            await this.subjectRoomRepository.findBySubjectAndRoom(
                data.subjectId,
                data.roomId
            );

        if (subjectRoom) {
            throw new Error("Esta sala já está vinculada à matéria.");
        }

        if (data.priority < 1) {
            throw new Error("A prioridade deve ser maior que zero.");
        }

        return await this.subjectRoomRepository.create(data);
    }
}