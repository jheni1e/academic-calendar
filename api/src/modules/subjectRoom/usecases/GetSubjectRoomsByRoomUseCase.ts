import { NotFoundError } from "../../../shared/errors/NotFoundError.ts";
import { ISubjectRoomRepository } from "../repositories/ISubjectRoomRepository.ts";

export class GetSubjectRoomsByRoomUseCase {
    constructor(
        private readonly subjectRoomRepository: ISubjectRoomRepository
    ) {}

    async execute(roomId: number) {

        const subjectRooms =
            await this.subjectRoomRepository.findByRoom(roomId);

        if (subjectRooms.length === 0) {
            throw new NotFoundError("No classrooms are linked to this subject.");
        }

        return subjectRooms;
    }
}