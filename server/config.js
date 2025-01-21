const configObj = {};

// let conn = "mongodb://localhost:27017/nfc-local";/
// let conn = "mongodb://nfcOrguser:nfcOrgpassword@185.199.53.154:27017/nfc"
let conn = "mongodb://nfc_dev_user:nfc_dev_password@185.199.53.154:27017/nfc-dev"
// let conn = "mongodb+srv://deepmca2014:deepmca2014@cluster0.zrjpwj3.mongodb.net/nfc"


// if (process.env.ENV == "prod") {
//   conn = "mongodb://localhost:27017/nfc-local";
// }

configObj.connectionString = conn;

export const config = configObj;
