import { IRoomRepository } from "../repositories/IRoomRepository.ts";

export class DeleteRoomUseCase{
    constructor(
        private readonly roomRepository: IRoomRepository
    ){}

    async execute(roomId: number){
        const room = await this.roomRepository.findById(roomId);
        
        // Need User Type Verification before delete!
        this.roomRepository.delete(roomId)
    }
}