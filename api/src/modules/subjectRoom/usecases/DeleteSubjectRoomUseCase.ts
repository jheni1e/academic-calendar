import { ISubjectRoomRepository } from "../repositories/ISubjectRoomRepository.ts";

export class DeleteSubjectRoomUseCase {
    constructor(
        private readonly subjectRoomRepository: ISubjectRoomRepository
    ) {}

    async execute(subjectRoomId: number) {

        const subjectRoom =
            await this.subjectRoomRepository.findById(subjectRoomId);

        if (!subjectRoom) {
            throw new Error("Vínculo não encontrado.");
        }

        await this.subjectRoomRepository.delete(subjectRoomId);
    }
}