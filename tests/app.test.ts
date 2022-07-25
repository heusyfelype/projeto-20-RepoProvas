import app from "../app.js";
import supertest from "supertest";
import { prisma } from "../src/config/DBconnection.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


export const validBodyLogin = {
    email: 'testeemail@email.com',
    password: 'senha'
}

export const invalidEmailLogin = {
    email: 'testeemailemail.com',
    password: 'senha'
}

export const invalidPasswordLogin = {
    email: 'testeemailemail.com',
    password: ''
}

// afterAll(async () => {
//     await prisma.$executeRaw`TRUNCATE TABLE users`;
//     await prisma.$executeRaw`TRUNCATE TABLE tests CASCADE`;
// })

// beforeAll(async () =>{
//     await prisma.users.create({data:validBodyLogin})
// })
beforeEach(async () => {
    // await prisma.users.delete({where:{email:validBodyLogin.email}})
    await prisma.$executeRaw`TRUNCATE TABLE users`;

})

describe("POST sign-up", () => {

    it("given a valid email and password, it should create an user", async () => {

        const tryCreate = await supertest(app).post("/sign-up").send(validBodyLogin);
        expect(tryCreate.status).toEqual(201);

    });

    it("given a valid email and password, it should persist user", async () => {

        await supertest(app).post("/sign-up").send(validBodyLogin);
        let user = "";
        try {
            const infos = await prisma.users.findFirst({ where: { email: validBodyLogin.email } })
            user = infos.email
        } catch (e) {
        }
        expect(user).toBe(validBodyLogin.email)
    });

    it("given an invalid email, it shouldn't create an user", async () => {

        const tryCreate = await supertest(app).post("/sign-up").send(invalidEmailLogin);
        expect(tryCreate.status).toEqual(401);

    });
    it("given an invalid password, it shouldn't create an user", async () => {

        const tryCreate = await supertest(app).post("/sign-up").send(invalidPasswordLogin);
        expect(tryCreate.status).toEqual(401);
    });


});

describe("POST sign-in", () => {

    it("given a correct email and password, it should signin", async () => {

        await supertest(app).post("/sign-up").send(validBodyLogin);
        const trySignin = await supertest(app).post("/sign-in").send(validBodyLogin);

        expect(trySignin.body.token).not.toBe(undefined || null);

    });

    it("given a correct email and password, it should signin", async () => {

        await supertest(app).post("/sign-up").send(validBodyLogin);
        const trySignin = await supertest(app).post("/sign-in").send(validBodyLogin);

        dotenv.config()
        const JWTKey = process.env.JWT_SECRET
        let isValidToken: boolean;
        try {
            if (jwt.verify(trySignin.body.token, JWTKey)) {
                isValidToken = true
            }
        } catch (e) {
            isValidToken = false
        }
        expect(isValidToken).toBe(true);
    });

    it("given an incorrect email and password, it shouldn't signin", async () => {

        await supertest(app).post("/sign-up").send(validBodyLogin);
        const trySignin = await supertest(app).post("/sign-in").send(invalidEmailLogin);

        expect(trySignin.status).toBe(401)

    });

    it("given an incorrect password and password, it shouldn't signin", async () => {

        await supertest(app).post("/sign-up").send(validBodyLogin);
        const trySignin = await supertest(app).post("/sign-in").send(invalidPasswordLogin);

        expect(trySignin.status).toBe(401)

    });
});

afterAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users`;
})


const validTest = {
    "name": "a name for this test",
    "category": "Prática", // deve existir
    "pdfUrl": "https://play-lh.googleusercontent.com/BkRfMfIRPR9hUnmIYGDgHHKjow-g18-ouP6B2ko__VnyUHSi1spcc78UtZ4sVUtBH4g",
    "teacherDiscipline": "Bruna Hamori",
    "discipline": "Humildade"
}

const invalidTestName = {
    "name": "",
    "category": "Prática", // deve existir
    "pdfUrl": "https://play-lh.googleusercontent.com/BkRfMfIRPR9hUnmIYGDgHHKjow-g18-ouP6B2ko__VnyUHSi1spcc78UtZ4sVUtBH4g",
    "teacherDiscipline": "Bruna Hamori",
    "discipline": "Humildade"
}

const incorrectTestCategory = {
    "name": "a name",
    "category": "inexistente pratica",
    "pdfUrl": "https://play-lh.googleusercontent.com/BkRfMfIRPR9hUnmIYGDgHHKjow-g18-ouP6B2ko__VnyUHSi1spcc78UtZ4sVUtBH4g",
    "teacherDiscipline": "Bruna Hamori",
    "discipline": "Humildade"
}

const incorrectTestTeacher = {
    "name": "a name",
    "category": "Prática",
    "pdfUrl": "https://play-lh.googleusercontent.com/BkRfMfIRPR9hUnmIYGDgHHKjow-g18-ouP6B2ko__VnyUHSi1spcc78UtZ4sVUtBH4g",
    "teacherDiscipline": "Hamori",
    "discipline": "Humildade"
}

const incorrectTestDiscipline = {
    "name": "a name",
    "category": "Prática",
    "pdfUrl": "https://play-lh.googleusercontent.com/BkRfMfIRPR9hUnmIYGDgHHKjow-g18-ouP6B2ko__VnyUHSi1spcc78UtZ4sVUtBH4g",
    "teacherDiscipline": "Bruna Hamori",
    "discipline": "Uma disciplina Inexistente"
}

describe("POST /tests", () => {
    let testId: number;

    it("given correct infos from new test, it should create", async () => {

        await supertest(app).post("/sign-up").send(validBodyLogin);
        const trySignin = await supertest(app).post("/sign-in").send(validBodyLogin);
        const authToken = trySignin.body.token

        const response = await supertest(app).post("/tests").send(validTest).set("Authorization", authToken)
        testId = response.body.id

        expect(response.statusCode).toBe(201)
    });

    it("given correct infos from new test, it should persist", async () => {
        const response = await prisma.tests.findFirst({ where: { id: testId } })

        expect(response.id).toBeGreaterThan(0);
    });

    it("given invalid name from new test, it should return error", async () => {

        await supertest(app).post("/sign-up").send(validBodyLogin);
        const trySignin = await supertest(app).post("/sign-in").send(validBodyLogin);
        const authToken = trySignin.body.token

        const response = await supertest(app).post("/tests").send(invalidTestName).set("Authorization", authToken)
        testId = response.body.id

        expect(response.statusCode).toBe(401)
    });

    it("given incorrect test category from new test, it should return error", async () => {

        await supertest(app).post("/sign-up").send(validBodyLogin);
        const trySignin = await supertest(app).post("/sign-in").send(validBodyLogin);
        const authToken = trySignin.body.token

        const response = await supertest(app).post("/tests").send(incorrectTestCategory).set("Authorization", authToken)
        testId = response.body.id

        expect(response.statusCode).toBe(404)
    });

    it("given incorrect test Discipline name from new test, it should return error", async () => {

        await supertest(app).post("/sign-up").send(validBodyLogin);
        const trySignin = await supertest(app).post("/sign-in").send(validBodyLogin);
        const authToken = trySignin.body.token

        const response = await supertest(app).post("/tests").send(incorrectTestDiscipline).set("Authorization", authToken)
        testId = response.body.id

        expect(response.statusCode).toBe(404)
    });

    it("given incorrect test teacher name from new test, it should return error", async () => {

        await supertest(app).post("/sign-up").send(validBodyLogin);
        const trySignin = await supertest(app).post("/sign-in").send(validBodyLogin);
        const authToken = trySignin.body.token

        const response = await supertest(app).post("/tests").send(incorrectTestTeacher).set("Authorization", authToken)
        testId = response.body.id

        expect(response.statusCode).toBe(404)
    });

})


describe("GET /tests group by Disciplines", () => {
    it("getting tests group by term, it should return status 200", async () => {

        await supertest(app).post("/sign-up").send(validBodyLogin);
        const trySignin = await supertest(app).post("/sign-in").send(validBodyLogin);
        const authToken = trySignin.body.token

        const response = await supertest(app).get("/tests?groupBy=disciplines").set("Authorization", authToken)

        expect(response.statusCode).toBe(200)
    });
})


describe("GET /tests group by Teachers", () => {
    it("getting tests group by term, it should return status 200", async () => {

        await supertest(app).post("/sign-up").send(validBodyLogin);
        const trySignin = await supertest(app).post("/sign-in").send(validBodyLogin);
        const authToken = trySignin.body.token

        const response = await supertest(app).get("/tests?groupBy=teachers").set("Authorization", authToken)

        expect(response.statusCode).toBe(200)
    });
})


describe("GET /tests group by Category", () => {
    it("getting tests group by term, it should return status 200", async () => {

        await supertest(app).post("/sign-up").send(validBodyLogin);
        const trySignin = await supertest(app).post("/sign-in").send(validBodyLogin);
        const authToken = trySignin.body.token

        const response = await supertest(app).get("/categories").set("Authorization", authToken)

        expect(response.statusCode).toBe(200)
    });
})

