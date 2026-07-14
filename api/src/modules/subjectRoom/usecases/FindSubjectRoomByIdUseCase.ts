import { NotFoundError } from "../../../shared/errors/NotFoundError.ts";
import { ISubjectRoomRepository } from "../repositories/ISubjectRoomRepository.ts";

export class FindSubjectRoomByIdUseCase {
    constructor(
        private readonly subjectRoomRepository: ISubjectRoomRepository
    ) {}

    async execute(subjectRoomId: number) {

        const subjectRoom =
            await this.subjectRoomRepository.findById(subjectRoomId);

        if (!subjectRoom) {
            throw new NotFoundError("Link between subject and room not found.");
        }

        return subjectRoom;
    }
}