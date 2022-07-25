import app from "../app.js";
import supertest from "supertest";
import { prisma } from "../src/config/DBconnection.js";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users`;
    await prisma.$executeRaw`TRUNCATE TABLE tests CASCADE`;
  })

describe("POST", () => {
    // ...

    it("given a valid email and password, should create an user", async () => {
        const body = {
          email: 'testeemail@email.com',
          password: 'senha'
        };

        const tryCreate = await supertest(app).post("/sign-up").send(body);
        expect(tryCreate.status).toEqual(201); 

    });
});