import { ISubjectRoomRepository } from "../repositories/ISubjectRoomRepository.ts";

export class FindSubjectRoomByIdUseCase {
    constructor(
        private readonly subjectRoomRepository: ISubjectRoomRepository
    ) {}

    async execute(subjectRoomId: number) {

        const subjectRoom =
            await this.subjectRoomRepository.findById(subjectRoomId);

        if (!subjectRoom) {
            throw new Error("Vínculo não encontrado.");
        }

        return subjectRoom;
    }
}