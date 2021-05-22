import app from "@shared/infra/http/app";
import request from "supertest";
import createAdmin from "@shared/infra/typeorm/seed/admin";
import connection from "@shared/infra/typeorm";
import clearDataBase from "@shared/infra/typeorm/seed/clearDatabase";

let adminToken: string;

describe("List category controller", () => {
   beforeAll(async () => {
      await (await connection).runMigrations();
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

   it("should be able to list all categories", async () => {
      await request(app)
         .post("/categories/create")
         .send({
            name: "Category superteste list",
            description: "Category superteste",
         })
         .set({
            Authorization: `Bearer ${adminToken}`,
         });

      const response = await request(app).get("/categories/list");

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
   });
});
