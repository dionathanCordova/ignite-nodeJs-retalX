import { v4 as uuid } from "uuid";
import { hash } from "bcrypt";
import createConnection from "../index";

async function create() {
   const id = uuid();
   const password = await hash("admin", 8);
   const created_at = new Date().toISOString();
   await (await createConnection).query(
      `INSERT INTO users
         (id, name, email, password, driver_license, is_admin, created_at) VALUES
         ('${id}', 'admin', 'admin@rentX.com.br', '${password}', 'admin', true, '${created_at}')
      `
   );
}

create().then(() => console.log("admin user created"));

export default create;
