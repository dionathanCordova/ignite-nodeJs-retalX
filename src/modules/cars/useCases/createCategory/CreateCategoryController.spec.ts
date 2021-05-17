import app from "@shared/infra/http/app";
import request from "supertest";
import createAdmin from "@shared/infra/typeorm/seed/admin";
import clearDataBase from "@shared/infra/typeorm/seed/clearDatabase";
import createConnection from "@shared/infra/typeorm";

let adminToken: string;

describe("Create category controller", () => {
   beforeAll(async () => {
      await (await createConnection).runMigrations();
      await createAdmin();

      const responseToken = await request(app).post("/session").send({
         email: "admin@rentX.com.br",
         password: "admin",
      });

      const { token } = responseToken.body;
      adminToken = token;
   });

   afterAll(async () => {
      await clearDataBase();
   });

   it("should be able to craeate a new category", async () => {
      const response = await request(app)
         .post("/categories/create")
         .send({
            name: "Category superteste",
            description: "Category superteste",
         })
         .set({
            Authorization: `Bearer ${adminToken}`,
         });

      expect(response.status).toBe(201);
   });

   it("should not be able do create a new category with name exists", async () => {
      await request(app)
         .post("/categories/create")
         .send({
            name: "Category superteste",
            description: "Category superteste",
         })
         .set({
            Authorization: `Bearer ${adminToken}`,
         });

      const response = await request(app)
         .post("/categories/create")
         .send({
            name: "Category superteste",
            description: "Category superteste",
         })
         .set({
            Authorization: `Bearer ${adminToken}`,
         });

      expect(response.status).toBe(401);
   });
});
