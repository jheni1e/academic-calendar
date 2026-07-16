export interface CreateAssignmentDTO {
    userId: number;
    roleId: number;
}

export interface UpdateAssignmentDTO {
    userId?: number;
    roleId?: number;
}

export interface AssignmentResponseDTO {
    assignmentId: number;
    userId: number;
    roleId: number;
}