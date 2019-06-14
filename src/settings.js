// const DB_USER  = 'fifatradeapi'
// const DB_PASSWORD = 'fifapasswordapi'
module.exports.settings = {
    DB_HOST : process.env.DB_HOST ||'localhost',
    DB_USER  : process.env.DB_USER || 'fifatrade',
    DB_PASSWORD : process.env.DB_PASSWORD || 'fifatradepassword',
    DB_DATABASE :process.env.DB_DATABASE ||'fifa-trading',
    DB_PORT : process.env.DB_PORT || 5432,
    APP_PORT: process.env.PORT || 8080,
};