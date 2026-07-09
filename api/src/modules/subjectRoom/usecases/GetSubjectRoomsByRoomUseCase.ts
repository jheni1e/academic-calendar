import { ISubjectRoomRepository } from "../repositories/ISubjectRoomRepository.ts";

export class GetSubjectRoomsByRoomUseCase {
    constructor(
        private readonly subjectRoomRepository: ISubjectRoomRepository
    ) {}

    async execute(roomId: number) {

        const subjectRooms =
            await this.subjectRoomRepository.findByRoom(roomId);

        if (subjectRooms.length === 0) {
            throw new Error("Nenhuma matéria vinculada à sala.");
        }

        return subjectRooms;
    }
}