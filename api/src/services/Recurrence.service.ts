import { CreateRecurrenceDTO, UpdateRecurrenceDTO } from "../../dtos/recurrenceDTO.ts";
import { prisma } from "../../lib/prisma.ts";

export const createRecurrence = async (data: CreateRecurrenceDTO) => {
    const { frequency, repeat_until, occurrences, created_by, monday, tuesday, wednesday, thursday, friday, saturday, sunday } = data;

    return await prisma.recurrence.create({
        data: {
            frequency: frequency,
            repeat_until: repeat_until,
            occurrences: occurrences,
            created_by: created_by,
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
            saturday: saturday,
            sunday: sunday
        }
    });
}

export const updateRecurrence = async (data: UpdateRecurrenceDTO) => {
    const { frequency, endDate, occurrences, monday, tuesday, wednesday, thursday, friday, saturday, sunday } = data;

    return await prisma.recurrence.update({
        data: {
            frequency: frequency,
            endDate: endDate,
            occurrences: occurrences,
            monday: monday,
            tuesday: tuesday,
            wednesday: wednesday,
            thursday: thursday,
            friday: friday,
            saturday: saturday,
            sunday: sunday
        }
    });
}

export const deleteRecurrence = async (data: number) => {
    return await prisma.recurrence.update({
        where: {
            recurrence_id: data
        }
    });
}
