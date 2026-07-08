import { IRoomRepository } from "../repositories/IRoomRepository.ts";

export class FindRoomByIdUseCase {
    constructor(
        private readonly roomRepository: IRoomRepository
    ) {}
    
    async execute(roomId: number){

        const room = await this.roomRepository.findById(roomId);

        if (!room) {
            throw new Error("Sala não encontrada.");
        }

        return room;
    }
}