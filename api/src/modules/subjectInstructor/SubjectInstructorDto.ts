export interface CreateSubjectInstructorDTO {
    subjectId: number;
    instructorId: number;
}

export interface UpdateSubjectInstructorDTO {
    subjectId?: number;
    instructorId?: number;
}