import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaSubjectInstructorRepository } from "../repositories/PrismaSubjectInstructorRepository.ts";
import { GetSubjectInstructorsBySubjectUseCase } from "../usecases/GetSubjectInstructorsBySubjectUseCase.ts";

export class GetSubjectInstructorsBySubjectController {

    private readonly repository = new PrismaSubjectInstructorRepository();


    

}