import { ISubjectRoomRepository } from "../repositories/ISubjectRoomRepository.ts";

export class GetSubjectRoomsBySubjectUseCase {
    constructor(
        private readonly subjectRoomRepository: ISubjectRoomRepository
    ) {}

    async execute(subjectId: number) {

        const subjectRooms =
            await this.subjectRoomRepository.findBySubject(subjectId);

        if (subjectRooms.length === 0) {
            throw new Error("Nenhuma sala vinculada à matéria.");
        }

        return subjectRooms;
    }
}