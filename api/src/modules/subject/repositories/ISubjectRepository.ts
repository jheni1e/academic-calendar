import { Subject } from "../../../generated/prisma/client.ts";
import { CreateSubjectDTO, UpdateSubjectDTO } from "../../../dtos/SubjectDTO.ts";

export interface ISubjectRepository {
    
    create(data: CreateSubjectDTO): Promise<Subject>;

    findById(
        subjectId: number
    ): Promise<Subject | null>;

    findAll(): Promise<Subject[]>;

    update(
        subjectId: number,
        data: UpdateSubjectDTO
    ): Promise<Subject>;

    delete(
        subjectId: number
    ): Promise<void>;
}