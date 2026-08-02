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
            {
                user_edv: 92906895,
                name: "Rebeca Ianz",
                password: await hashPassword("caximba123"),
                birthday: new Date("2006-02-02T00:00:00Z"),
                role: "APPRENTICE"
            },
            {
                user_edv: 92906894,
                name: "Leticia Burlinski",
                password: await hashPassword("leleca123"),
                birthday: new Date("2006-02-02T00:00:00Z"),
                role: "APPRENTICE"
            },
            {
                user_edv: 92906893,
                name: "Thais Michel",
                password: await hashPassword("kindle123"),
                birthday: new Date("2006-02-02T00:00:00Z"),
                role: "APPRENTICE"
            }
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

    await prisma.classUser.createMany({
        data: [
            {
                class_id: dta3.class_id,
                user_id: 1 // Jhenifer Halma
            },
            {
                class_id: dta3.class_id,
                user_id: 2 // Fernanda Fialho
            },
            {
                class_id: dta3.class_id,
                user_id: 7 // Rebeca Ianz
            },
            {
                class_id: dta3.class_id,
                user_id: 8 // Leticia Burlinski
            },
            {
                class_id: dta3.class_id,
                user_id: 9 // Thais Michel
            }
        ],
        skipDuplicates: true
    });

    await prisma.subject.createMany({
        data: [
            {
                class_id: mec25.class_id,
                name: "MEC25 - IoT",
                workload: 40,
                start_date: new Date("2026-07-20T00:00:00Z"),
                completed_workload: 0,
                scheduled_workload: 0
            },
            {
                class_id: add2.class_id,
                name: "ADD2 - Python",
                workload: 60,
                start_date: new Date("2026-07-27T00:00:00Z"),
                completed_workload: 0,
                scheduled_workload: 0
            },
            {
                class_id: dta3.class_id,
                name: "DTA3 - C# Básico",
                workload: 80,
                start_date: new Date("2026-07-20T00:00:00Z"),
                completed_workload: 0,
                scheduled_workload: 0
            },
            {
                class_id: mec26.class_id,
                name: "MEC26 - Excel",
                workload: 30,
                start_date: new Date("2026-08-03T00:00:00Z"),
                completed_workload: 0,
                scheduled_workload: 0
            },
            {
                class_id: man25.class_id,
                name: "MAN25 - Power BI",
                workload: 36,
                start_date: new Date("2026-08-10T00:00:00Z"),
                completed_workload: 0,
                scheduled_workload: 0
            },
            {
                class_id: mec25.class_id,
                name: "MEC25 - Redes",
                workload: 40,
                start_date: new Date("2026-07-20T00:00:00Z"),
                completed_workload: 0,
                scheduled_workload: 0
            }
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
            { subject_id: 1, instructor_id: 6 }, // IoT -> Gabriel
            { subject_id: 2, instructor_id: 4 }, // Python -> Queila
            { subject_id: 2, instructor_id: 5 }, // Python -> Patrick
            { subject_id: 3, instructor_id: 5 }, // C# -> Patrick
            { subject_id: 3, instructor_id: 6 }, // C# -> Gabriel
            { subject_id: 4, instructor_id: 6 }, // Excel -> Gabriel
            { subject_id: 5, instructor_id: 4 }, // Power BI -> Queila
            { subject_id: 5, instructor_id: 6 }, // Power BI -> Gabriel
            { subject_id: 6, instructor_id: 5 }, // Redes -> Patrick
        ]
    });

    const pythonLesson = await prisma.event.create({
        data: {
            title: "Aula de Python",
            description: "Introdução à linguagem Python",
            event_type: EventType.LESSON,
    
            start_date: new Date("2026-07-27T13:30:00Z"),
            end_date: new Date("2026-07-27T17:30:00Z"),
    
            class_id: add2.class_id,
            subject_instructor_id: 2,
    
            created_by: 4
        }
    });

    await prisma.reservation.create({
        data: {
            room_id: 1,
            event_id: pythonLesson.event_id,
            description: "Python room reservation"
        }
    });

    const feedback = await prisma.event.create({
        data: {
            title: "Feedback Individual",
            description: "Feedback mensal com a aprendiz Jhenifer Halma.",
    
            event_type: EventType.FEEDBACK,
    
            start_date: new Date("2026-07-28T14:00:00Z"),
            end_date: new Date("2026-07-28T14:30:00Z"),
    
            created_by: 4
        }
    });

    await prisma.participation.create({
        data: {
            user_id: 1,
            event_id: feedback.event_id,
            status: "PENDING"
        }
    });

    const csharpLesson1 = await prisma.event.create({
        data: {
            title: "C# Básico - Aula 01",
            description: "Primeira aula de C#",
    
            event_type: EventType.LESSON,
            status: "COMPLETED",
    
            start_date: new Date("2026-07-21T13:30:00Z"),
            end_date: new Date("2026-07-21T17:30:00Z"),
    
            class_id: dta3.class_id,
            subject_instructor_id: 4,
    
            created_by: 5
        }
    });
    
    await prisma.reservation.create({
        data: {
            room_id: 1,
            event_id: csharpLesson1.event_id,
            description: "Reserva Aula 01"
        }
    });
    
    const csharpLesson2 = await prisma.event.create({
        data: {
            title: "C# Básico - Aula 02",
            description: "Segunda aula de C#",
    
            event_type: EventType.LESSON,
            status: "COMPLETED",
    
            start_date: new Date("2026-07-23T13:30:00Z"),
            end_date: new Date("2026-07-23T17:30:00Z"),
    
            class_id: dta3.class_id,
            subject_instructor_id: 4,
    
            created_by: 5
        }
    });
    
    await prisma.reservation.create({
        data: {
            room_id: 1,
            event_id: csharpLesson2.event_id,
            description: "Reserva Aula 02"
        }
    });
    
    const csharpLesson3 = await prisma.event.create({
        data: {
            title: "C# Básico - Aula 03",
            description: "Terceira aula de C#",
    
            event_type: EventType.LESSON,
            status: "CONFIRMED",
    
            start_date: new Date("2026-08-05T13:30:00Z"),
            end_date: new Date("2026-08-05T17:30:00Z"),
    
            class_id: dta3.class_id,
            subject_instructor_id: 4,
    
            created_by: 5
        }
    });
    
    await prisma.reservation.create({
        data: {
            room_id: 1,
            event_id: csharpLesson3.event_id,
            description: "Reserva Aula 03"
        }
    });

    await prisma.subject.update({
        where: {
            subject_id: 3
        },
        data: {
            scheduled_workload: 12,
            completed_workload: 8
        }
    });
}

main()
    .finally(async () => {
        await prisma.$disconnect();
    });