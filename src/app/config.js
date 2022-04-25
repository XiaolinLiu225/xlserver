const dotenv = require("dotenv")
const fs = require("fs")
const path = require("path")
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, "./keys/public.key"))
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, "./keys/private.key"))

dotenv.config()

const {
    APP_PORT,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD,
    APP_HOST
} = process.env;

module.exports = {
    APP_PORT,
    APP_HOST,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_USER,
    MYSQL_PASSWORD
}

module.exports.PUBLIC_KEY = PUBLIC_KEY
module.exports.PRIVATE_KEY = PRIVATE_KEY