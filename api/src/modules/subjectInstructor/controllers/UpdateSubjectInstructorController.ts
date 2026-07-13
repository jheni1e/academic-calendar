import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaSubjectInstructorRepository } from "../repositories/PrismaSubjectInstructorRepository.ts";
import { UpdateSubjectInstructorUseCase } from "../usecases/UpdateSubjectInstructorUseCase.ts";

export class UpdateSubjectInstructorController {

    private readonly repository = new PrismaSubjectInstructorRepository();

    

    

}