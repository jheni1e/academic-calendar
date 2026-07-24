import "dotenv/config"
import { EventType, PrismaClient } from "../src/generated/prisma/client.ts";
import { hashPassword } from "../src/app/utils/password.ts";

const prisma = new PrismaClient();

async function main() {
    await prisma.user.createMany({
        data: [
            {
                user_edv: 92906824,
                name: "Jhenifer Halma",
                password: await hashPassword("jheni123"),
                birthday: new Date("2006-10-13T00:00:00Z"),
                role: "APPRENTICE"
            },
            {
                user_edv: 92906815,
                name: "Fernanda Fialho",
                password: await hashPassword("fefito123"),
                birthday: new Date("2006-02-02T00:00:00Z"),
                role: "APPRENTICE"
            },
            {
                user_edv: 92906899,
                name: "Fabio Silveira",
                password: await hashPassword("fabio123"),
                birthday: new Date("1970-02-02T00:00:00Z"),
                role: "ADMIN"
            },
            {
                user_edv: 92906898,
                name: "Queila Lima",
                password: await hashPassword("queila123"),
                birthday: new Date("2002-02-02T00:00:00Z"),
                role: "ADMIN"
            },
            {
                user_edv: 92906897,
                name: "Patrick Pereira",
                password: await hashPassword("quadrado1"),
                birthday: new Date("2003-02-02T00:00:00Z"),
                role: "INSTRUCTOR"
            },
            {
                user_edv: 92906896,
                name: "Gabriel Bernadelli",
                password: await hashPassword("bernadelli123"),
                birthday: new Date("2004-02-02T00:00:00Z"),
                role: "INSTRUCTOR"
            },
        ],
        skipDuplicates: true,
    });

    const dta3 = await prisma.class.create({
        data: {
            name: "DTA3"
        }
    });

    const mec25 = await prisma.class.create({
        data: {
            name: "MEC25"
        }
    });

    const man25 = await prisma.class.create({
        data: {
            name: "MAN25"
        }
    });

    const mec26 = await prisma.class.create({
        data: {
            name: "MEC26"
        }
    });

    const add2 = await prisma.class.create({
        data: {
            name: "ADD2"
        }
    });

    await prisma.subject.createMany({
        data: [
            {
                class_id: mec25.class_id,
                name: "IoT",
                workload: 40,
                start_date: new Date("2026-07-20T00:00:00Z"),
                completed_workload: 0
            },
            {
                class_id: add2.class_id,
                name: "Python",
                workload: 60,
                start_date: new Date("2026-07-27T00:00:00Z"),
                completed_workload: 0
            },
            {
                class_id: dta3.class_id,
                name: "C# Básico",
                workload: 80,
                start_date: new Date("2026-07-20T00:00:00Z"),
                completed_workload: 0
            },
            {
                class_id: mec26.class_id,
                name: "Excel",
                workload: 30,
                start_date: new Date("2026-08-03T00:00:00Z"),
                completed_workload: 0
            },
            {
                class_id: man25.class_id,
                name: "Power BI",
                workload: 34,
                start_date: new Date("2026-08-10T00:00:00Z"),
                completed_workload: 0
            },
        ],
        skipDuplicates: true,
    });

    await prisma.room.createMany({
        data: [
            {
                title: "Sala Digital",
                capacity: 22,
                description: "Sala principal."
            },
            {
                title: "Sala Fedida",
                capacity: 22,
                description: "Sala que é fedida kk."
            },
            {
                title: "Sala Fábio",
                capacity: 22,
                description: "Sala anexa ao escritório do Fábio Silveira."
            },
            {
                title: "War Room",
                capacity: 30,
                description: "Sala de war room localizada no CT-104."
            },
        ],
        skipDuplicates: true,
    });

    await prisma.subjectInstructor.createMany({
        data: [
            {
                subject_id: 1,
                instructor_id: 6
            },
            {
                subject_id: 2,
                instructor_id: 4
            },
            {
                subject_id: 3,
                instructor_id: 5
            },
            {
                subject_id: 4,
                instructor_id: 6
            },
            {
                subject_id: 5,
                instructor_id: 4
            }
        ]
    })

    const recurrence = await prisma.recurrence.create({
        data: {
            series_name: "Python - Segunda e Quarta",
            repeat_until: new Date("2026-09-30T00:00:00Z"),

            monday: true,
            wednesday: true,

            creator: {
                connect: {
                    user_id: 4
                }
            }
        }
    });

    await prisma.event.create({
        data: {
            title: "Aula de Python",
            description: "Introdução à linguagem Python",
            event_type: EventType.LESSON,

            start_date: new Date("2026-07-27T13:30:00Z"),
            end_date: new Date("2026-07-27T17:30:00Z"),

            subject_instructor_id: 1,
            recurrence_id: recurrence.recurrence_id,

            created_by: 4
        }
    });
}

main()
    .finally(async () => {
        await prisma.$disconnect();
    });