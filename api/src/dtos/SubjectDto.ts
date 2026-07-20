export interface CreateSubjectDTO {
    classId: number;
    name: string;
    workload: number;
    startDate: Date;
}

export interface UpdateSubjectDTO {
    classId?: number;
    name?: string;
    workload?: number;
    startDate?: Date;
    isActive?: boolean;
}

// export type SubjectResponseDTO = {
//     subjectId: number;
//     classId: number;
//     name: string;
//     workload: number;
//     startDate: Date;
//     endDate: Date;
// }