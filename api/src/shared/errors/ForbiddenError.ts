import { AppError } from "./AppError.ts";

export class ForbiddenError extends AppError {

    constructor(message = "Você não possui permissão para esta ação.") {
        super(message, 403);
    }

}