import app from "@shared/infra/http/app";
import request from "supertest";
import createAdmin from "@shared/infra/typeorm/seed/admin";
import connection from "@shared/infra/typeorm";

describe("Create category controller", () => {
   beforeAll(async () => {
      await (await connection).runMigrations();
      const user = createAdmin();
   });

   afterAll(async () => {
      (await connection).dropDatabase();
      await (await connection).close();
   });

   it("should be able to craeate a new category", async () => {
      const responseToken = await request(app).post("/session").send({
         email: "admin@rentX.com.br",
         password: "admin",
      });

      const { token } = responseToken.body;

      const response = await request(app)
         .post("/category")
         .send({
            name: "Category superteste",
            description: "Category superteste",
         })
         .set({
            Authorizarion: `Baere ${token}`,
         });

      expect(response.status).toBe(201);
   });

   it("should not be able do create a new category with name exists", async () => {
      const responseToken = await request(app).post("/session").send({
         email: "admin@rentX.com.br",
         password: "admin",
      });

      const { token } = responseToken.body;

      const response = await request(app)
         .post("/category")
         .send({
            name: "Category superteste",
            description: "Category superteste",
         })
         .set({
            Authorizarion: `Baere ${token}`,
         });

      expect(response.status).toBe(400);
   });
});
