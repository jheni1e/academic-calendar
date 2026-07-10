import { IRoomRepository } from "../repositories/IRoomRepository.ts";

export class DeleteRoomUseCase{
    constructor(
        private readonly roomRepository: IRoomRepository
    ){}

    async execute(roomId: number){
        const room = await this.roomRepository.findById(roomId);
        
        if (!room) {
            throw new Error("Sala não encontrada.");
        }
        
        if (room.is_active) {
            throw new Error("Apenas salas inativas podem ser deletadas.");
        }        
        
        // TODO: Need User Type Verification before delete!
        // TODO: Verify if the room has reservations before deleting.
        this.roomRepository.delete(roomId)
    }
}