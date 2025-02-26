const DataTypes = require("sequelize").DataTypes;
const defineDepartamento = require("./departamento");
const defineEmpleado = require("./empleado");

function initModels(sequelize) {
  const Departamento = defineDepartamento(sequelize, DataTypes);
  const Empleado = defineEmpleado(sequelize, DataTypes);

  // Relación: Un departamento tiene muchos empleado
  Departamento.hasMany(Empleado, {
    as: "empleado",
    foreignKey: "id_departamento",
  });

  // Relación: Un empleado pertenece a un departamento
  Empleado.belongsTo(Departamento, {
    as: "departamento",
    foreignKey: "id_departamento",
  });

  return { Departamento, Empleado };
}

module.exports = initModels;
