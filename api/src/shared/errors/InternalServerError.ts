import { AppError } from "./AppError.ts";

export class InternalServerError extends AppError {

    constructor(message = "Erro interno do servidor.") {
        super(message, 500);
    }

}