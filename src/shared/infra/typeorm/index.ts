import { createConnection } from "typeorm";
export default createConnection();

// import { Connection, createConnection, getConnectionOptions } from "typeorm";

// export default async (host = "database_ignite"): Promise<Connection> => {
//    const defaultOptions = await getConnectionOptions();

//    console.log(defaultOptions);
//    return createConnection(
//       Object.assign(defaultOptions, {
//          database: process.env.NODE_ENV === "test" ? "rentx_test" : defaultOptions.database,
//       })
//    );
// };
