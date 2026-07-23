import { CreateRecurrenceDTO, UpdateRecurrenceDTO } from "../dtos/recurrenceDTO.ts";
import { prisma } from "../lib/prisma.ts";

export const createRecurrence = async (data: CreateRecurrenceDTO) => {
    const { seriesName, createdBy, repeatUntil, occurrences, monday, tuesday, wednesday, thursday, friday } = data;

    if (createdBy == null) {
        throw new Error("Criador é obrigatório.");
    }

    return await prisma.recurrence.create({
        data: {
            series_name: seriesName != undefined ? seriesName : "",
            created_by: createdBy,
            repeat_until: repeatUntil,
            occurrences: occurrences,
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday
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
