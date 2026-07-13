import { Request, Response } from "express";

import { AppError } from "../../../shared/errors/AppError.ts";

import { PrismaSubjectInstructorRepository } from "../repositories/PrismaSubjectInstructorRepository.ts";
import { GetSubjectsByInstructorUseCase } from "../usecases/GetSubjectsByInstructorUseCase.ts";

export class GetSubjectsByInstructorController {

    private readonly repository = new PrismaSubjectInstructorRepository();

   

   

}