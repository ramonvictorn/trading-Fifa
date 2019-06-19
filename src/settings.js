// const DB_USER  = 'fifatradeapi'
// const DB_PASSWORD = 'fifapasswordapi'
module.exports.settings = {
    DB_HOST : process.env.DB_HOST ||'ec2-174-129-242-183.compute-1.amazonaws.com',
    DB_USER  : process.env.DB_USER || 'rxivowgzrfygob',
    DB_PASSWORD : process.env.DB_PASSWORD || 'e24461d4f9877e500933bb540f4e220372d7d9932e20eae380ae0e3ae60768d6',
    DB_DATABASE :process.env.DB_DATABASE ||'d304f52i3gdhpj',
    DB_PORT : process.env.DB_PORT || 5432,
    APP_PORT: process.env.PORT || 8080,
};