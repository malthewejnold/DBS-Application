const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const config = require('../config/config')
const db = {};

var sequelize = new Sequelize(config.db.DB, config.db.USER, config.db.PASSWORD, {
  host: config.db.SERVER,
  dialect: "mssql",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  dialectOptions: {
    encrypt: true,
  },
});

fs.readdirSync(__dirname)
  .filter((file) => file !== "index.js")
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
