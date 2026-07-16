import { IRoomRepository } from "../repositories/IRoomRepository.ts";
import { CreateRoomDTO } from "../../../dtos/RoomDto.ts";

export class CreateRoomUseCase {
    constructor(
        private readonly roomRepository: IRoomRepository
    ) {}
    
    async execute(data: CreateRoomDTO){
        
        if (!data.title.trim()) {
            throw new Error("Nome da sala é obrigatório!");
        }

        return await this.roomRepository.create(data);
    }
}