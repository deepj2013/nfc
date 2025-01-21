const configObj = {};

 let conn = "mongodb://localhost:27017/nfc-local";
//let conn = "mongodb+srv://deepmca2014:deepmca2014@cluster0.zrjpwj3.mongodb.net/nfc"


// if (process.env.ENV == "prod") {
//   conn = "mongodb://localhost:27017/nfc-local";
// }

configObj.connectionString = conn;

export const config = configObj;
