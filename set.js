const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0dCb2JvUFgyTXQ1QStvYWwvOVE5Z3pZNmM4cUNpaFhvVnExTlFBWGYwOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVVhsOVRxT0RHWis1QjF1TFd4WXIvS0tyS1J1aSsxWVYxQ0hTZkYrSkxTYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxTy9tOVkwbnpRa3JEeWc5SjZ2UUZ6WnA4ZGZmVnBjOWd6SE84T1R6RFU4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTbGo4c3hmV0NqMHBUOGRORVlDalRBa085Y2R6ZVJIY2MwS0k1emlkM2kwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1FSHdzd1lERDJLYnIyRityZ1B6UGV2U0M4akJOWEsyVmF2ZzJnMExCRWs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImllUVV1VmFxRVRDKy83QWZIQU1yRkRjRVFNRXZPcFNUbTAzSHg5M0IyV1k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV0ZERHpvUS9SMjJKQXRMekJmZEs0aEZDYnRLbS9DcUtFcS8vaElIdi9VRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUpvZE0yY282eTdEbEhKUUx5bVJtcVdraGZBV1pQODBhR1dpMW05WlcwQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllrSXNEUTFydk1xSlN3YlhhZTFmNlc3Y2lnbjY5SnhCVVlJaklCcGRqemt3RWtIT25JODhpN1JJTFFEbjcrUndzMVNkMGx4Ykg5ak1IWGJRMVQrWERBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjE3LCJhZHZTZWNyZXRLZXkiOiJ2Z1djV0pkQUNsYlhIWkc5RTA0Q1ZPV094VTlwVVJEd3A4YjBuaEF4aG80PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI2MzcxMDM4NjY1OEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJFN0ExQTlBNDUyOEE2NThCNzFBNEQ1QjIyNkE3MEYyNCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzIxODQzOTU0fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNjM3MTAzODY2NThAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiOEQzQjdENzMzNjc4RDVGMDU5ODhGNzI3RTU0QTk1NDIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyMTg0Mzk1NX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiYkNrRnNqbENTNE9iLXVTMm9xeWFUZyIsInBob25lSWQiOiJjMTJmM2Q3ZS05MTMwLTRmODgtOTlmYy0zMTM2OTVmNTEzZGEiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSGFFRlYxZXptQ21TQnVoT3Z2MEpJamNLRE5FPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBac0w1Y3VBdENTeUdDOGh2MEJJclNIMVFvOD0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJYQ1MxVjdLOCIsIm1lIjp7ImlkIjoiMjYzNzEwMzg2NjU4OjdAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoicHAifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1BUUmpNSUZFT0tCaGJVR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ik53bGIxVHBvUWRKYldERkhWS3BKNFR4NEFZOSsyUzM5Uy8rVGtDZlZnWDA9IiwiYWNjb3VudFNpZ25hdHVyZSI6Ik9RYnBEVnNnTllBMW5aVUxIK0k0QlJYT1R6Um5DODZTYUNUMUE0RWhOTmhZZUVqMVNYaWkzcHlnZkhsTG9NL09wNVUrNjJQc01YOFRPTmVNMXdzM0JnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJZU2F6VmIxSXRtcGVkQkdNYWtYN3p3N2t1aDg3NFZ4ZDRTUmRTU1lEaHdsQVhYV2RjMlEwMTdxQW02L3BISWkrSlNnRTZ4azNrWVJLZm1KRDFhVnNEZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2MzcxMDM4NjY1ODo3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlRjSlc5VTZhRUhTVzFneFIxU3FTZUU4ZUFHUGZ0a3QvVXYvazVBbjFZRjkifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjE4NDM5NTIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRUUzIn0=',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "joel Tech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "263 71 038 6658",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BEST CODER MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/1774326c63cc0b0e87680.jpg,https://telegra.ph/file/2e5cb1ec0619781c9fa41.jpg,https://telegra.ph/file/91e4fd1e8ce0fe6bb2253.jpg,https://telegra.ph/file/19df783b5751341a78780.jpg,https://telegra.ph/file/56dfb94e0f8b32fab33a7.jpg,https://telegra.ph/file/fe8a25fb17af3926e6048.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
