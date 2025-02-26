const Respuesta = require("../utils/respuesta");
const { logMensaje } = require("../utils/logger");
const { Op } = require("sequelize");
const initModels = require("../models/init-models");
const sequelize = require("../config/sequelize");

const models = initModels(sequelize);
const Empleado = models.Empleado; // ✅ Nombre correcto (con mayúscula)
const Departamento = models.Departamento; // Para relaciones

class EmpleadoController {
  // 📊 Gráfica de empleados por departamento
  async getGraficaEmpleados(req, res) {
    try {
      const data = await Empleado.findAll({
        attributes: [
          [sequelize.col("departamento.nombre"), "nombre"],
          [sequelize.fn("COUNT", sequelize.col("id_empleado")), "cantidad"],
        ],
        include: [
          {
            model: Departamento,
            as: "departamento",
            attributes: [],
          },
        ],
        group: ["departamento.nombre"],
        raw: true,
      });

      res.json(Respuesta.exito(data, "Datos para gráfica recuperados"));
    } catch (error) {
      logMensaje(`Error en getGraficaEmpleados: ${error.message}`);
      res.status(500).json(Respuesta.error(null, "Error al generar gráfica"));
    }
  }

  async searchEmpleadoByNombre(req, res) {
    try {
      const { nombre } = req.query;

      if (!nombre?.trim()) {
        return res
          .status(400)
          .json(Respuesta.error(null, "El parámetro 'nombre' es obligatorio"));
      }

      const empleados = await Empleado.findAll({
        where: { nombre: { [Op.like]: `%${nombre}%` } },
        include: {
          model: Departamento,
          as: "departamento",
          attributes: ["nombre"],
        },
      });

      res.json(Respuesta.exito(empleados, "Búsqueda exitosa"));
    } catch (error) {
      logMensaje(`Error en searchEmpleadoByNombre: ${error.message}`);
      res.status(500).json(Respuesta.error(null, "Error en la búsqueda"));
    }
  }

  // 📦 Obtener todos
  async getAllEmpleados(req, res) {
    try {
      const empleados = await Empleado.findAll({
        include: {
          model: Departamento,
          as: "departamento",
          attributes: ["nombre"],
        },
      });
      res.json(Respuesta.exito(empleados, "Empleados recuperados"));
    } catch (error) {
      logMensaje(`Error en getAllEmpleados: ${error.message}`);
      res.status(500).json(Respuesta.error(null, "Error al obtener empleados"));
    }
  }

  // 🔎 Obtener por ID
  async getEmpleadoById(req, res) {
    try {
      const id_empleado = req.params.id_empleado;
      const empleado = await Empleado.findByPk(id_empleado, {
        include: {
          model: Departamento,
          as: "departamento",
          attributes: ["nombre"],
        },
      });

      if (!empleado) {
        return res
          .status(404)
          .json(Respuesta.error(null, "Empleado no encontrado"));
      }

      res.json(Respuesta.exito(empleado, "Datos del empleado"));
    } catch (error) {
      logMensaje(`Error en getEmpleadoById: ${error.message}`);
      res.status(500).json(Respuesta.error(null, "Error al buscar empleado"));
    }
  }

  // ➕ Crear
  async createEmpleado(req, res) {
    try {
      const { nombre, email, salario, fecha_contratacion, id_departamento } =
        req.body;

      if (!nombre || !email || !fecha_contratacion) {
        return res
          .status(400)
          .json(
            Respuesta.error(null, "Nombre, email y fecha son obligatorios")
          );
      }

      const nuevoEmpleado = await Empleado.create({
        nombre: nombre.trim(),
        email: email.trim(),
        salario,
        fecha_contratacion,
        id_departamento,
      });

      res.status(201).json(Respuesta.exito(nuevoEmpleado, "Empleado creado"));
    } catch (error) {
      logMensaje(`Error en createEmpleado: ${error.message}`);
      res.status(500).json(Respuesta.error(null, "Error al crear empleado"));
    }
  }

  // ✏️ Actualizar
  async updateEmpleado(req, res) {
    try {
      const id_empleado = req.params.id_empleado;
      const datos = req.body;

      if (id_empleado != datos.id_empleado) {
        return res.status(400).json(Respuesta.error(null, "ID no coincide"));
      }

      const [filasActualizadas] = await Empleado.update(datos, {
        where: { id_empleado },
      });

      if (filasActualizadas === 0) {
        return res
          .status(404)
          .json(Respuesta.error(null, "Empleado no encontrado"));
      }

      res.status(204).send();
    } catch (error) {
      logMensaje(`Error en updateEmpleado: ${error.message}`);
      res.status(500).json(Respuesta.error(null, "Error al actualizar"));
    }
  }

  // 🗑️ Eliminar
  async deleteEmpleado(req, res) {
    try {
      const id_empleado = req.params.id_empleado;
      const filasEliminadas = await Empleado.destroy({
        where: { id_empleado },
      });

      if (filasEliminadas === 0) {
        return res
          .status(404)
          .json(Respuesta.error(null, "Empleado no encontrado"));
      }

      res.status(200).json(Respuesta.exito(null, "Empleado eliminado"));
    } catch (error) {
      logMensaje(`Error en deleteEmpleado: ${error.message}`);
      res.status(500).json(Respuesta.error(null, "Error al eliminar"));
    }
  }
}

module.exports = new EmpleadoController();
