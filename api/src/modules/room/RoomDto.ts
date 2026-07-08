export interface CreateRoomDTO {
    title: string;
    capacity: number;
    description: Date;
}

export interface UpdateRoomDTO {
    title?: string;
    capacity?: number;
    description?: Date;
    is_active?: boolean;
}

// export type RoomResponseDTO = {
// }