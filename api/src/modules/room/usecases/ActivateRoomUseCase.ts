import { IRoomRepository } from "../repositories/IRoomRepository.ts";
import { UpdateRoomDTO } from "../RoomDto.ts";

export class ActivateRoomUseCase{
    constructor(
        private readonly roomRepository: IRoomRepository
    ){}

    async execute(roomId: number){
        const room = await this.roomRepository.findById(roomId);

        if (!room) {
            throw new Error("Room not found.");
        }

        if (room.is_active) {
            throw new Error("Room is already active.");
        }

        return await this.roomRepository.update(roomId, {
            is_active: true
        });
    }
}