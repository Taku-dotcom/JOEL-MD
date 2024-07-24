const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNkVMRUNwUnlEdHVzN3MvUHg3YXhTWk0rWTJCZWYyZzFxQUpnSmtCUkxrWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0trWGQwWkNqYlZMb1ZKSjUyYmRKTldqQ1p1OXRvK0xsMlR5UGl6QVZTST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDRlF2Qyt1NkVReW9Ub0hhc21SMzh5MkxRQW1wOXRRck13ejBNTjU1T1ZJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBc3VKSU9DYkNnazVBdkhjQTc3TlhpdEV0Zk50aEhpVlp3WHR1R1pqYng0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InNFSWY3S2hXejZEWEoxZlhrV0kycllrbUxENk1OdlB5ODBveFZ3SXRKa1E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNhTTFBSHBPNGNaR2RyRWQ3UTlLNThhU28ydzdxeTlNYnJ0U1lvZ3NiemM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibVByZHhRRE8wTXdkbVNOUWVJL05OM3dOZzU5V2ZmOExQUjhlcDM2alZVMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaGx4L2ZzdUtpb3ZxNmdXQnQ1SnZqVHhHRkRHK05uQnBpUlhyQU9MNG94WT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ilp3NHlGeThxQ0hsbElLbldXVURLUWxLdG9aR3V3dzJSWjZlUjJGWTljSzREenVTejBiMFJmcDZUM0l6eDYxZFRlUXZqRE9RMG0xY0ZQZnQrUVZRQWpnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM1LCJhZHZTZWNyZXRLZXkiOiJDdy8zQTJzdEFIN3hCMXNRZVVMWTVpN1hidHc5LzU3aENDcjlrVU5sb3g0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJjdU95LTFlNFE2SzA5MXQ0N2FwdlRBIiwicGhvbmVJZCI6IjkwOGIxMmM1LWE4MmMtNGYxZC05YzhiLWU4MWJmZjhhODdhMSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJRdkdrWHVoNHdSK25mNHpsejBjY1BNNkcwbk09In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUzZzYnVaeFltRTZYMlRmeFZxS21SZnVqOG5nPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlM1RE1YNzE0IiwibWUiOnsiaWQiOiIyNjM3NzEzNTYwNjc6MTFAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ091dm1wRUNFSW5oaGJVR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IndMSU9MV2NsODNzcGhLbjhRM1B1bXhxb3hKenhRUTRVYUtRbUNvbHdlbnM9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImNJMjF5WXpjTGQwajNWL2xzTDVwU0RZRE00NlNUQTlqcmNILzgvdnBnRFNqeHdzTXhETzZVakhhakJvaEpuUXB3SXlSRlhGRGFoVU4vUTUzU3pFNUN3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJnVFBQWEtFczhpR2h0VWczMW1aZTcwZlZPcStuMnc4UEFzYkt3M3g1YkRZellDa2JINDlxN21MNzBCSlA2KzNaamlrWU5IWVFOTkhRZy9LTnlXU3FoZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2Mzc3MTM1NjA2NzoxMUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJjQ3lEaTFuSmZON0tZU3AvRU56N3BzYXFNU2M4VUVPRkdpa0pncUpjSHA3In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxODU2MTUwfQ==',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "joel Tech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "263771356067",              
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
