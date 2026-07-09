import { ISubjectRoomRepository } from "../repositories/ISubjectRoomRepository.ts";
import { UpdateSubjectRoomDTO } from "../SubjectRoomDTO.ts";

export class UpdateSubjectRoomUseCase {
    constructor(
        private readonly subjectRoomRepository: ISubjectRoomRepository
    ) {}

    async execute(
        subjectRoomId: number,
        data: UpdateSubjectRoomDTO
    ) {

        const subjectRoom =
            await this.subjectRoomRepository.findById(subjectRoomId);

        if (!subjectRoom) {
            throw new Error("Vínculo não encontrado.");
        }

        if (data.priority !== undefined && data.priority < 1) {
            throw new Error("A prioridade deve ser maior que zero.");
        }

        return await this.subjectRoomRepository.update(
            subjectRoomId,
            data
        );
    }
}