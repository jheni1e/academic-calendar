import { IRoomRepository } from "../repositories/IRoomRepository.ts";
import { UpdateRoomDTO } from "../RoomDto.ts";

export class UpdateRoomUseCase{
    constructor(
        private readonly roomRepository: IRoomRepository
    ){}

    async execute(roomId: number, data: UpdateRoomDTO){

        const room = await this.roomRepository.findById(roomId);

        if (!room)
            throw new Error("Sala não encontrada.");

        if (data.title !== undefined && !data.title.trim()) {
            throw new Error("Nome da sala obrigatório");
        }      

        return await this.roomRepository.update(roomId, data)
    }
}