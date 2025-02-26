const { Sequelize, DataTypes } = require("sequelize");
const initModels = require("./init-models");

// Configura la conexión a la base de datos
const sequelize = new Sequelize("empresa_informatica", "root", "test", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

// Inicializa modelos
const models = initModels(sequelize);

// Sincroniza modelos con la base de datos (opcional)
sequelize.sync().then(() => console.log("Base de datos sincronizada"));

module.exports = { sequelize, ...models };
