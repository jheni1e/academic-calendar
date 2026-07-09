import { ISubjectRoomRepository } from "../repositories/ISubjectRoomRepository.ts";

export class FindSubjectRoomUseCase {
    constructor(
        private readonly subjectRoomRepository: ISubjectRoomRepository
    ) {}

    async execute(
        subjectId: number,
        roomId: number
    ) {

        const subjectRoom =
            await this.subjectRoomRepository.findBySubjectAndRoom(
                subjectId,
                roomId
            );

        if (!subjectRoom) {
            throw new Error("Vínculo entre matéria e sala não encontrado.");
        }

        return subjectRoom;
    }
}