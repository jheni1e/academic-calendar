export interface CreateSubjectRoomDTO {
    subjectId: number;
    roomId: number;
    priority: number;
}

export interface UpdateSubjectRoomDTO {
    subjectId?: number;
    roomId?: number;
    priority?: number;
}