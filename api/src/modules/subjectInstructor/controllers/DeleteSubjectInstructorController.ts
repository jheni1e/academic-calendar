import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaSubjectInstructorRepository } from "../repositories/PrismaSubjectInstructorRepository.ts";
import { DeleteSubjectInstructorUseCase } from "../usecases/DeleteSubjectInstructorUseCase.ts";

export class DeleteSubjectInstructorController {

    private readonly repository = new PrismaSubjectInstructorRepository();

    
   

}