import { ISubjectRoomRepository } from "../repositories/ISubjectRoomRepository.ts";

export class GetSubjectRoomsUseCase {
    constructor(
        private readonly subjectRoomRepository: ISubjectRoomRepository
    ) {}

    async execute() {

        return await this.subjectRoomRepository.findAll();
    }
}