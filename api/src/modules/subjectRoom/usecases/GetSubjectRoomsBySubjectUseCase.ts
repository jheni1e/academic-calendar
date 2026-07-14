import { NotFoundError } from "../../../shared/errors/NotFoundError.ts";
import { ISubjectRoomRepository } from "../repositories/ISubjectRoomRepository.ts";

export class GetSubjectRoomsBySubjectUseCase {
    constructor(
        private readonly subjectRoomRepository: ISubjectRoomRepository
    ) {}

    async execute(subjectId: number) {

        const subjectRooms =
            await this.subjectRoomRepository.findBySubject(subjectId);

        if (subjectRooms.length === 0) {
            throw new NotFoundError("No classrooms are linked to this subject.");
        }

        return subjectRooms;
    }
}