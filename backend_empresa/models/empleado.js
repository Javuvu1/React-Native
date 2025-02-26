const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Empleado = sequelize.define(
    "empleado",
    {
      id_empleado: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      salario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      fecha_contratacion: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      id_departamento: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "departamento",
          key: "id_departamento",
        },
      },
    },
    {
      sequelize,
      tableName: "empleado",
      timestamps: false,
    }
  );

  return Empleado;
};
