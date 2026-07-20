import { AppError } from "./AppError.ts";

export class UnauthorizedError extends AppError {

    constructor(message = "Usuário não autenticado.") {
        super(message, 401);
    }

}