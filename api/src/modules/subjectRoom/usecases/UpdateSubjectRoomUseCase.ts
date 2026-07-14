import { NotFoundError } from "../../../shared/errors/NotFoundError.ts";
import { ValidationError } from "../../../shared/errors/ValidationError.ts";
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
            throw new NotFoundError("Link not found.");
        }

        if (data.priority !== undefined && data.priority < 1) {
            throw new ValidationError("The priority must be greater than zero.");
        }

        return await this.subjectRoomRepository.update(
            subjectRoomId,
            data
        );
    }
}