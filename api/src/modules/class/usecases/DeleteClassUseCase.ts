import { ConflictError } from "../../../shared/errors/ConflictError.ts";
import { IAssignmentRepository } from "../../assignment/repositories/IAssignmentRepository.ts";
import { IClassUserRepository } from "../../classUser/repositories/IClassUserRepository.ts";
import { IEventRepository } from "../../event/repositories/IEventRepository.ts";
import { IUserRepository } from "../../user/repositories/IUserRepository.ts";
import { IClassRepository } from "../repositories/IClassRepository.ts";

export class DeleteClassUseCase {
    constructor(
        private readonly classRepository: IClassRepository,
        private readonly classUserRepository: IClassUserRepository,
        private readonly eventRepository: IEventRepository
    ) {}

    async execute(classId: number) {

        const classItem = await this.classRepository.findById(classId);
        const users = await this.classUserRepository.findByClass(classId);
        const events = await this.eventRepository.findByClass(classId);

        if (!classItem) {
            throw new Error("Class not found.");
        }

        // Verify if the class has users before deleting.

        if (classItem.is_active) {
            throw new Error("Only inactive classes can be deleted.");
        }

        if (users.length > 0)
        throw new ConflictError(
            "Cannot delete a class with enrolled users."
        );

        // Verify if the class has events before deleting.

        if (events.length > 0) {
            throw new ConflictError(
                "Cannot delete a class with events."
            );
        }

        // TODO: Need User Type Verification before delete!

        // TODO: Verify if the class has subjects before deleting.


        await this.classRepository.delete(classId);
    }
}