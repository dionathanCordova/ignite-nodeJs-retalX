import createConnection from "../index";

async function clearDataBase() {
   await (await createConnection).query("DELETE FROM users");
   await (await createConnection).query("DELETE FROM categories");
}

clearDataBase().then(() => console.log("database clear"));

export default clearDataBase;
