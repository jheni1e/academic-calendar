import { IRoomRepository } from "../repositories/IRoomRepository.ts";

export class GetRoomsUseCase {
    constructor(
        private readonly roomRepository: IRoomRepository
    ) {}
    
    async execute(){
        return await this.roomRepository.findAll();
    }
}