const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Departamento = sequelize.define(
    "departamento",
    {
      id_departamento: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      ubicacion: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      presupuesto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      fecha_creacion: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    },
    {
      sequelize,
      tableName: "departamento",
      timestamps: false,
    }
  );

  return Departamento;
};
