const config = require("../config");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mysql",
  host: config.DB_HOST,
  username: config.DB_USER,
  database: config.DB_NAME,
  password: config.DB_PASSWORD,
  port: config.DB_PORT,
  define: {
    timestamps: false,
  },
  logging: false,
});

module.exports = sequelize;
