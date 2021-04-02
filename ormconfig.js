const connection = {
   type: process.env.DB_CONNECTION,
   host: process.env.DB_HOST,
   port: process.env.DB_PORT,
   username: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_DATABASE,
   entities: [process.env.DB_ENTITIES],
   migrations: [process.env.DB_MIGRATIONS],
   cli: {
      migrationsDir: process.env.DB_MIGRATIONS_DIR,
   },
   synchronize: false,
   logging: process.env.NODE_ENV == "development" ? true : false,
};

connection.database = process.env.NODE_ENV === "test" ? "./src/database/database.test.sqlite" : process.env.DB_DATABASE;

module.exports = connection;
