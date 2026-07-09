import { IRoomRepository } from "../repositories/IRoomRepository.ts";
import { UpdateRoomDTO } from "../RoomDto.ts";

export class DeactivateRoomUseCase{
    constructor(
        private readonly roomRepository: IRoomRepository
    ){}

    async execute(roomId: number){
        const room = await this.roomRepository.findById(roomId);

        if (!room) {
            throw new Error("Sala não encontrada.");
        }

        if (!room.is_active) {
            throw new Error("A sala já está inativa.");
        }

        return await this.roomRepository.update(roomId, {
            is_active: false
        });
    }
}