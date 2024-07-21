const configObj = {};

let conn = "mongodb://localhost:27017/nfc-local";

// if (process.env.ENV == "prod") {
//   conn = "mongodb://localhost:27017/nfc-local";
// }

configObj.connectionString = conn;

export const config = configObj;
