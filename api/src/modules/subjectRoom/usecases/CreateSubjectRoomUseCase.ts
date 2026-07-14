import { ConflictError } from "../../../shared/errors/ConflictError.ts";
import { ValidationError } from "../../../shared/errors/ValidationError.ts";
import { ISubjectRoomRepository } from "../repositories/ISubjectRoomRepository.ts";
import { CreateSubjectRoomDTO } from "../SubjectRoomDTO.ts";

export class CreateSubjectRoomUseCase {
    constructor(
        private readonly subjectRoomRepository: ISubjectRoomRepository
    ) {}

    async execute(data: CreateSubjectRoomDTO) {

        const subjectRoom =
            await this.subjectRoomRepository.findBySubjectAndRoom(
                data.subjectId,
                data.roomId
            );

        if (subjectRoom) {
            throw new ConflictError("This room is already linked to the subject.");
        }

        if (data.priority < 1) {
            throw new ValidationError("The priority must be greater than zero.");
        }

        return await this.subjectRoomRepository.create(data);
    }
}