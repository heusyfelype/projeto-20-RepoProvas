import { prisma } from "../config/DBconnection.js";
import { Tests } from "@prisma/client";



export async function getTestsByDiscipline() {
    const tests = await prisma.terms.findMany({
        include: {
            disciplines: {
                include: {
                    teacherDisciplines: {
                        select: {
                            teacher: true,
                            tests: {
                                select: {
                                    id: true,
                                    name: true,
                                    pdfUrl: true,
                                    category:{
                                        select:{
                                            id: true,
                                            name:true,                                           
                                        }
                                    }
                                }
                            },
                        }
                    }
                }
            }
        }
    });

    return { tests }
}



export async function getTestsByCategory() {
    const categories = await prisma.categories.findMany({
        include: {
            tests: {
                include: {
                    teacherDiscipline: {
                        select: {
                            id: true,
                            discipline: true,
                            teacher: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    return { categories }
}



export async function getTestsByTeacher() {
    const tests = await prisma.teachersDisciplines.findMany({
        include: {
            discipline: {
                include: {
                    teacherDisciplines: {
                        select: {
                            id: true,
                            teacherId: true,
                            disciplineId: true,
                            tests: {
                                select: {
                                    id: true,
                                    name: true
                                }
                            }
                        }
                    }
                }
            },
            tests: {
                include: {
                    category: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            },
            teacher: {
                select: {
                    id: true,
                    name: true,
                }
            },
        }
    });

    return { tests }
}

type testTypePrisma = Omit<Tests, "id">
export async function registerTest(infos: testTypePrisma) {
    await prisma.tests.create({
        data: infos
    })
}


export async function findCategoryByName(name: string) {
    return await prisma.categories.findFirst({ where: { name } })

}

export async function findTeacherByName(name: string) {
    return await prisma.teachers.findFirst({ where: { name } })
}

export async function findDisciplineByName(name: string) {
    return await prisma.disciplines.findFirst({ where: { name } })
}


export async function findOrCreateTeacherDiscipline(teacherId: number, disciplineId: number) {
    return await prisma.teachersDisciplines.upsert({
        where: {
            disciplineId_teacherId: {
                disciplineId,
                teacherId
            }
        },
        update: {},
        create: {
            teacherId,
            disciplineId
        }
    })
}

