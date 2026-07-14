import { ISubjectRepository } from "../../subject/repositories/ISubjectRepository.ts";
import { IUserRepository } from "../../user/repositories/IUserRepository.ts";
import { ISubjectInstructorRepository } from "../repositories/ISubjectInstructorRepository.ts";
import { CreateSubjectInstructorDTO } from "../SubjectInstructorDto.ts";

export class CreateSubjectInstructorUseCase {
    constructor(
        private readonly subjectInstructorRepository: ISubjectInstructorRepository,
        private readonly subjectRepository: ISubjectRepository,
        private readonly userRepository: IUserRepository
    ) {}

    async execute(data: CreateSubjectInstructorDTO) {

        // Verificar se a matéria existe.
        const subject = await this.subjectRepository.findById(
            data.subjectId
        )
        if (!subject) {
            throw new Error("Subject doesn't exist!");
        }

        // Verificar se o usuário existe.
        const user = await this.userRepository.findById(
            data.instructorId
        )
        if (!user) {
            throw new Error("Instructor doesn't exist!");
        }

        const relation = await this.subjectInstructorRepository.findBySubjectAndInstructor(
            data.subjectId,
            data.instructorId
        );

        if (relation) {
            throw new Error("Instrutor já vinculado à matéria.");
        }

        return await this.subjectInstructorRepository.create(data);
    }
}