import { CreateRecurrenceDTO, UpdateRecurrenceDTO } from "../../dtos/recurrenceDTO.ts";
import { prisma } from "../../lib/prisma.ts";

export const createRecurrence = async (data: CreateRecurrenceDTO) => {
    const { repeat_until, occurrences, created_by, monday, tuesday, wednesday, thursday, friday } = data;

    return await prisma.recurrence.create({
        data: {
            repeat_until: repeat_until,
            occurrences: occurrences,
            created_by: created_by,
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
