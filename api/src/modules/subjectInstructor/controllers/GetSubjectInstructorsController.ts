import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaSubjectInstructorRepository } from "../repositories/PrismaSubjectInstructorRepository.ts";
import { GetSubjectInstructorsUseCase } from "../usecases/GetSubjectInstructorsUseCase.ts";

export class GetSubjectInstructorsController {

    private readonly repository = new PrismaSubjectInstructorRepository();

    

   

}