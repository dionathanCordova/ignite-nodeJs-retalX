import app from "@shared/infra/http/app";
import request from "supertest";
import createAdmin from "@shared/infra/typeorm/seed/admin";
import connection from "@shared/infra/typeorm";

describe("List category controller", () => {
   beforeAll(async () => {
      await (await connection).runMigrations();
      const user = createAdmin();
   });

   afterAll(async () => {
      (await connection).dropDatabase();
      await (await connection).close();
   });

   it("should be able to list all categories", async () => {
      const responseToken = await request(app).post("/session").send({
         email: "admin@rentX.com.br",
         password: "admin",
      });

      const { token } = responseToken.body;

      await request(app)
         .post("/category")
         .send({
            name: "Category superteste",
            description: "Category superteste",
         })
         .set({
            Authorizarion: `Baere ${token}`,
         });

      const response = await request(app).get("/categories");

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(1);
   });
});
