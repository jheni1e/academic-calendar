import { CreateRecurrenceDTO, UpdateRecurrenceDTO } from "../dtos/recurrenceDTO.ts";
import { prisma } from "../lib/prisma.ts";
import { NotFoundError } from "../shared/errors/NotFoundError.ts";

export const createRecurrence = async (
    data: CreateRecurrenceDTO,
    createdBy: number
) => {

    const creator = await prisma.user.findUnique({
        where: {
            user_id: createdBy
        }
    });
    
    if (!creator) {
        throw new NotFoundError("Creator user not found.");
    }

    return prisma.recurrence.create({
        data: {
            series_name: data.seriesName ?? "",
            created_by: createdBy,
            repeat_until: data.repeatUntil,
            occurrences: data.occurrences,
            monday: data.monday,
            tuesday: data.tuesday,
            wednesday: data.wednesday,
            thursday: data.thursday,
            friday: data.friday
        }
    });
}

export const updateRecurrence = async (data: UpdateRecurrenceDTO) => {

    const { recurrence_id, repeat_until, occurrences, monday, tuesday, wednesday, thursday, friday } = data;

    return prisma.recurrence.update({
        where: {
            recurrence_id
        },
        data: {
            repeat_until,
            occurrences,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday
        }
    });
};

export const deleteRecurrence = async (data: number) => {
    return prisma.recurrence.delete({
        where: {
            recurrence_id: data
        }
    });
}
