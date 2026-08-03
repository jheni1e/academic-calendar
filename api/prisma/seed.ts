import "dotenv/config"
import { EventStatus, EventType, ParticipationStatus, Prisma, PrismaClient } from "../src/generated/prisma/client.ts";
import { hashPassword } from "../src/app/utils/password.ts";

const prisma = new PrismaClient();

async function main() {

    await prisma.user.createMany({
        data: [
            // ==========================
            // Apprentices
            // ==========================
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
            },
    
            // ==========================
            // Administrators
            // ==========================
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
    
            // ==========================
            // Instructors
            // ==========================
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
                user_edv: 92906892,
                name: "Lucas Buchner",
                password: await hashPassword("lucas123"),
                birthday: new Date("2002-05-15T00:00:00Z"),
                role: "INSTRUCTOR"
            },
            {
                user_edv: 92906891,
                name: "Nycollas Sobolevski",
                password: await hashPassword("nycollas123"),
                birthday: new Date("2001-08-20T00:00:00Z"),
                role: "INSTRUCTOR"
            }
        ],
        skipDuplicates: true,
    });

    const dta2 = await prisma.class.create({
        data: {
            name: "DTA2"
        }
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
            // ==========================
            // MEC25
            // ==========================
            {
                class_id: mec25.class_id,
                name: "MEC25 - Internet of Things",
                workload: 40,
                start_date: new Date("2026-07-20T00:00:00Z"),
                completed_workload: 0,
                scheduled_workload: 0
            },
            {
                class_id: mec25.class_id,
                name: "MEC25 - Eletrônica",
                workload: 40,
                start_date: new Date("2026-08-17T00:00:00Z"),
                completed_workload: 0,
                scheduled_workload: 0
            },
            {
                class_id: mec25.class_id,
                name: "MEC25 - Desenho Técnico",
                workload: 40,
                start_date: new Date("2026-09-14T00:00:00Z"),
                completed_workload: 0,
                scheduled_workload: 0
            },
            {
                class_id: mec25.class_id,
                name: "MEC25 - Trigonometria",
                workload: 40,
                start_date: new Date("2026-10-12T00:00:00Z"),
                completed_workload: 0,
                scheduled_workload: 0
            },
            {
                class_id: mec25.class_id,
                name: "MEC25 - Inglês",
                workload: 40,
                start_date: new Date("2026-11-09T00:00:00Z"),
                completed_workload: 0,
                scheduled_workload: 0
            },
    
            // ==========================
            // MAN25
            // ==========================
            {
                class_id: man25.class_id,
                name: "MAN25 - Internet of Things",
                workload: 40,
                start_date: new Date("2026-07-20T00:00:00Z"),
                completed_workload: 0,
                scheduled_workload: 0
            },
            {
                class_id: man25.class_id,
                name: "MAN25 - Eletrônica",
                workload: 40,
                start_date: new Date("2026-08-17T00:00:00Z"),
                completed_workload: 0,
                scheduled_workload: 0
            },
            {
                class_id: man25.class_id,
                name: "MAN25 - Desenho Técnico",
                workload: 40,
                start_date: new Date("2026-09-14T00:00:00Z"),
                completed_workload: 0,
                scheduled_workload: 0
            },
            {
                class_id: man25.class_id,
                name: "MAN25 - Trigonometria",
                workload: 40,
                start_date: new Date("2026-10-12T00:00:00Z"),
                completed_workload: 0,
                scheduled_workload: 0
            },
            {
                class_id: man25.class_id,
                name: "MAN25 - Inglês",
                workload: 40,
                start_date: new Date("2026-11-09T00:00:00Z"),
                completed_workload: 0,
                scheduled_workload: 0
            },
    
            // ==========================
            // ADD2
            // ==========================
            {
                class_id: add2.class_id,
                name: "ADD2 - Python",
                workload: 60,
                start_date: new Date("2026-07-27T00:00:00Z"),
                completed_workload: 0,
                scheduled_workload: 0
            },
            {
                class_id: add2.class_id,
                name: "ADD2 - Angular",
                workload: 60,
                start_date: new Date("2026-08-24T00:00:00Z"),
                completed_workload: 0,
                scheduled_workload: 0
            },
            {
                class_id: add2.class_id,
                name: "ADD2 - C#",
                workload: 60,
                start_date: new Date("2026-09-21T00:00:00Z"),
                completed_workload: 0,
                scheduled_workload: 0
            },
            {
                class_id: add2.class_id,
                name: "ADD2 - Power BI",
                workload: 40,
                start_date: new Date("2026-10-19T00:00:00Z"),
                completed_workload: 0,
                scheduled_workload: 0
            },
            {
                class_id: add2.class_id,
                name: "ADD2 - Inglês",
                workload: 40,
                start_date: new Date("2026-11-16T00:00:00Z"),
                completed_workload: 0,
                scheduled_workload: 0
            },
    
            // ==========================
            // DTA2
            // ==========================
            {
                class_id: dta2.class_id,
                name: "DTA2 - Python",
                workload: 60,
                start_date: new Date("2026-07-27T00:00:00Z"),
                completed_workload: 0,
                scheduled_workload: 0
            },
            {
                class_id: dta2.class_id,
                name: "DTA2 - Angular",
                workload: 60,
                start_date: new Date("2026-08-24T00:00:00Z"),
                completed_workload: 0,
                scheduled_workload: 0
            },
            {
                class_id: dta2.class_id,
                name: "DTA2 - C#",
                workload: 60,
                start_date: new Date("2026-09-21T00:00:00Z"),
                completed_workload: 0,
                scheduled_workload: 0
            },
            {
                class_id: dta2.class_id,
                name: "DTA2 - Power BI",
                workload: 40,
                start_date: new Date("2026-10-19T00:00:00Z"),
                completed_workload: 0,
                scheduled_workload: 0
            },
            {
                class_id: dta2.class_id,
                name: "DTA2 - Inglês",
                workload: 40,
                start_date: new Date("2026-11-16T00:00:00Z"),
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
            // ==========================
            // MEC25
            // ==========================
            { subject_id: 1, instructor_id: 8 },  // MEC25 - Internet of Things -> Patrick
            { subject_id: 2, instructor_id: 8 },  // MEC25 - Eletrônica -> Patrick
            { subject_id: 3, instructor_id: 9 },  // MEC25 - Desenho Técnico -> Gabriel
            { subject_id: 4, instructor_id: 10 }, // MEC25 - Trigonometria -> Lucas
            { subject_id: 5, instructor_id: 7 },  // MEC25 - Inglês -> Queila
    
            // ==========================
            // MAN25
            // ==========================
            { subject_id: 6, instructor_id: 8 },  // Internet of Things
            { subject_id: 7, instructor_id: 8 },  // Eletrônica
            { subject_id: 8, instructor_id: 9 },  // Desenho Técnico
            { subject_id: 9, instructor_id: 10 }, // Trigonometria
            { subject_id: 10, instructor_id: 7 }, // Inglês
    
            // ==========================
            // ADD2
            // ==========================
            { subject_id: 11, instructor_id: 7 },  // Python
            { subject_id: 12, instructor_id: 11 }, // Angular
            { subject_id: 13, instructor_id: 11 }, // C#
            { subject_id: 14, instructor_id: 7 },  // Power BI
            { subject_id: 15, instructor_id: 7 },  // Inglês
    
            // ==========================
            // DTA2
            // ==========================
            { subject_id: 16, instructor_id: 7 },  // Python
            { subject_id: 17, instructor_id: 11 }, // Angular
            { subject_id: 18, instructor_id: 11 }, // C#
            { subject_id: 19, instructor_id: 7 },  // Power BI
            { subject_id: 20, instructor_id: 7 },  // Inglês
        ],
        skipDuplicates: true
    });
    
    // =====================================================
    // ADD2 - Power BI (5 aulas)
    // =====================================================

    await createSeedLesson(prisma, {
        title: "ADD2 - Power BI - Aula 1",
        description: "Introdução ao Power BI",
        createdBy: 3,
        subjectInstructorId: 14,
        roomId: 1,
        start: new Date("2026-07-20T08:00:00Z"),
        end: new Date("2026-07-20T10:00:00Z")
    });

    await createSeedLesson(prisma, {
        title: "ADD2 - Power BI - Aula 2",
        description: "Importação de Dados",
        createdBy: 3,
        subjectInstructorId: 14,
        roomId: 1,
        start: new Date("2026-07-27T08:00:00Z"),
        end: new Date("2026-07-27T10:00:00Z")
    });

    await createSeedLesson(prisma, {
        title: "ADD2 - Power BI - Aula 3",
        description: "Modelagem de Dados",
        createdBy: 3,
        subjectInstructorId: 14,
        roomId: 1,
        start: new Date("2026-08-03T08:00:00Z"),
        end: new Date("2026-08-03T10:00:00Z")
    });

    await createSeedLesson(prisma, {
        title: "ADD2 - Power BI - Aula 4",
        description: "Relacionamentos",
        createdBy: 3,
        subjectInstructorId: 14,
        roomId: 1,
        start: new Date("2026-08-10T08:00:00Z"),
        end: new Date("2026-08-10T10:00:00Z")
    });

    await createSeedLesson(prisma, {
        title: "ADD2 - Power BI - Aula 5",
        description: "Dashboards",
        createdBy: 3,
        subjectInstructorId: 14,
        roomId: 1,
        start: new Date("2026-08-17T08:00:00Z"),
        end: new Date("2026-08-17T10:00:00Z")
    });


    // =====================================================
    // MAN25 - Eletrônica (2 aulas)
    // =====================================================

    await createSeedLesson(prisma, {
        title: "MAN25 - Eletrônica - Aula 1",
        description: "Fundamentos da Eletrônica",
        createdBy: 3,
        subjectInstructorId: 7,
        roomId: 2,
        start: new Date("2026-07-21T13:30:00Z"),
        end: new Date("2026-07-21T15:30:00Z")
    });

    await createSeedLesson(prisma, {
        title: "MAN25 - Eletrônica - Aula 2",
        description: "Componentes Eletrônicos",
        createdBy: 3,
        subjectInstructorId: 7,
        roomId: 2,
        start: new Date("2026-07-28T13:30:00Z"),
        end: new Date("2026-07-28T15:30:00Z")
    });


    // =====================================================
    // MEC25 - Desenho Técnico (4 aulas)
    // =====================================================

    await createSeedLesson(prisma, {
        title: "MEC25 - Desenho Técnico - Aula 1",
        description: "Normas Técnicas",
        createdBy: 3,
        subjectInstructorId: 3,
        roomId: 3,
        start: new Date("2026-07-22T08:00:00Z"),
        end: new Date("2026-07-22T10:00:00Z")
    });

    await createSeedLesson(prisma, {
        title: "MEC25 - Desenho Técnico - Aula 2",
        description: "Escalas",
        createdBy: 3,
        subjectInstructorId: 3,
        roomId: 3,
        start: new Date("2026-07-29T08:00:00Z"),
        end: new Date("2026-07-29T10:00:00Z")
    });

    await createSeedLesson(prisma, {
        title: "MEC25 - Desenho Técnico - Aula 3",
        description: "Projeções Ortogonais",
        createdBy: 3,
        subjectInstructorId: 3,
        roomId: 3,
        start: new Date("2026-08-05T08:00:00Z"),
        end: new Date("2026-08-05T10:00:00Z")
    });

    await createSeedLesson(prisma, {
        title: "MEC25 - Desenho Técnico - Aula 4",
        description: "Cortes e Seções",
        createdBy: 3,
        subjectInstructorId: 3,
        roomId: 3,
        start: new Date("2026-08-12T08:00:00Z"),
        end: new Date("2026-08-12T10:00:00Z")
    });

    // ======================================
    // Ajusta cargas horárias já concluídas
    // ======================================

    await prisma.subject.update({
        where: { subject_id: 1 }, // MEC25 - Internet of Things
        data: {
            completed_workload: 40
        }
    });

    await prisma.subject.update({
        where: { subject_id: 2 }, // MEC25 - Eletrônica
        data: {
            completed_workload: 12
        }
    });

    await prisma.subject.update({
        where: { subject_id: 3 }, // MEC25 - Desenho Técnico
        data: {
            completed_workload: 18
        }
    });

    await prisma.subject.update({
        where: { subject_id: 7 }, // MAN25 - Eletrônica
        data: {
            completed_workload: 10
        }
    });

    await prisma.subject.update({
        where: { subject_id: 11 }, // ADD2 - Python
        data: {
            completed_workload: 24
        }
    });

    await prisma.subject.update({
        where: { subject_id: 14 }, // ADD2 - Power BI
        data: {
            completed_workload: 8
        }
    });

    await prisma.subject.update({
        where: { subject_id: 16 }, // DTA2 - Python
        data: {
            completed_workload: 36
        }
    });

    await prisma.subject.update({
        where: { subject_id: 17 }, // DTA2 - Angular
        data: {
            completed_workload: 12
        }
    });
}

main()
    .finally(async () => {
        await prisma.$disconnect();
    });

const createSeedLesson = async (
    db: PrismaClient | Prisma.TransactionClient,
    data: {
        title: string;
        description?: string;

        subjectInstructorId: number;
        roomId: number;

        createdBy: number;

        start: Date;
        end: Date;
    }
) => {

    const assignment = await db.subjectInstructor.findUnique({
        where: {
            subject_instructor_id: data.subjectInstructorId
        },
        include: {
            subject: true
        }
    });

    if (!assignment) {
        throw new Error("Subject instructor not found.");
    }

    const event = await db.event.create({
        data: {
            title: data.title,
            description: data.description,

            event_type: EventType.LESSON,
            status: EventStatus.CONFIRMED,

            start_date: data.start,
            end_date: data.end,

            created_by: data.createdBy,

            class_id: assignment.subject.class_id,
            subject_instructor_id: assignment.subject_instructor_id,

            is_blocked: false
        }
    });

    await db.reservation.create({
        data: {
            room_id: data.roomId,
            event_id: event.event_id,
            description: data.description
        }
    });

    const students = await db.classUser.findMany({
        where: {
            class_id: assignment.subject.class_id
        },
        select: {
            user_id: true
        }
    });

    if (students.length > 0) {
        await db.participation.createMany({
            data: students.map(student => ({
                user_id: student.user_id,
                event_id: event.event_id,
                status: ParticipationStatus.CONFIRMED
            })),
            skipDuplicates: true
        });
    }

    const durationHours =
        (data.end.getTime() - data.start.getTime()) / (1000 * 60 * 60);

    await db.subject.update({
        where: {
            subject_id: assignment.subject.subject_id
        },
        data: {
            scheduled_workload: {
                increment: durationHours
            }
        }
    });

    return event;
};