import { findCategoryByName, findDisciplineByName, findOrCreateTeacherDiscipline, findTeacherByName, getTestsByCategory, getTestsByDiscipline, getTestsByTeacher, registerTest } from "../repositories/tests.js";


export async function getTestsByDisciplineService() {

    const tests = await getTestsByDiscipline()

    return tests
}


export async function getTestsByCategoryService() {

    const tests = await getTestsByCategory()

    return tests
}


export async function getTestsByTeacherService() {

    const tests = await getTestsByTeacher()

    return tests
}

export type testType = {
    name: string;
    pdfUrl: string;
    category: string;
    teacherDiscipline: string;
    discipline: string;
}
export async function registerTestService(infos: testType) {

    const findCategoryId = await findCategoryByName(infos.category)
    if(!findCategoryId){
        throw{"type":"not found", "message":"categoria inexistente"}
    }

    const findTeacherId = await findTeacherByName(infos.teacherDiscipline)
    if(!findTeacherId){
        throw{"type":"not found", "message":"professor não encontrado"}
    }

    const findDisciplineId = await findDisciplineByName(infos.discipline)
    if(!findDisciplineId){
        throw{"type":"not found", "message":"disciplina não encontrada"}
    }

    const findTeacherDisciplineId = await findOrCreateTeacherDiscipline(findTeacherId.id, findDisciplineId.id)
    
    const infosToCreate = {
        name: infos.name,
        pdfUrl: infos.pdfUrl,
        categoryId: findCategoryId.id,
        teacherDisciplineId: findTeacherDisciplineId.id
    }
    await registerTest(infosToCreate)
    
}

