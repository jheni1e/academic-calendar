import { IRoomRepository } from "../repositories/IRoomRepository.ts";
import { UpdateRoomDTO } from "../../../dtos/RoomDto.ts";

export class ActivateRoomUseCase{
    constructor(
        private readonly roomRepository: IRoomRepository
    ){}

    async execute(roomId: number){
        const room = await this.roomRepository.findById(roomId);

        if (!room) {
            throw new Error("Sala não encontrada.");
        }

        if (room.is_active) {
            throw new Error("Sala já está ativa.");
        }

        return await this.roomRepository.update(roomId, {
            is_active: true
        });
    }
}