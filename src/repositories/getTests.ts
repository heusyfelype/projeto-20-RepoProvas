import { prisma } from "../config/DBconnection.js";


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
       include:{
        tests:{
            include:{
                teacherDiscipline:{
                    select:{
                        id: true,
                        discipline: true,
                        teacher:{
                            select:{
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



