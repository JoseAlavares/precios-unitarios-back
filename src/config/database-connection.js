const { Sequelize } = require("sequelize");

const USER = process.env.DB_USER
const PASSWORD = process.env.DB_PASSWORD
const DB = process.env.DB_NAME
const HOST = process.env.DB_HOST
const DIALECT = process.env.DB_DIALECT
const DB_PORT = process.env.DB_PORT

const sequelize = new Sequelize(
    DB,
    USER,
    PASSWORD,
    {
        host: HOST,
        port: DB_PORT,
        dialect: DIALECT,
        //logging: false
    }
)

module.exports = sequelize
