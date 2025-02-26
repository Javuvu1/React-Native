const Respuesta = require("../utils/respuesta");
const { logMensaje } = require("../utils/logger");
const { Op } = require("sequelize");
const initModels = require("../models/init-models");
const sequelize = require("../config/sequelize");

const models = initModels(sequelize);
const Departamento = models.Departamento; // ✅ Nombre corregido (con mayúscula)

class DepartamentoController {
    // 🔍 Búsqueda por nombre
    async searchDepartamentoByNombre(req, res) {
        try {
            const { nombre } = req.query;

            if (!nombre) {
                return res.status(400).json(Respuesta.error(null, "Debe proporcionar un nombre"));
            }

            const departamentos = await Departamento.findAll({
                where: { nombre: { [Op.like]: `%${nombre}%` } }
            });

            res.json(Respuesta.exito(departamentos, "Búsqueda exitosa"));

        } catch (error) {
            logMensaje(`Error en búsqueda: ${error.message}`);
            res.status(500).json(Respuesta.error(null, "Error interno"));
        }
    }

    // 📦 Obtener todos los departamentos
    async getAllDepartamentos(req, res) {
        try {
            const departamentos = await Departamento.findAll();
            res.json(Respuesta.exito(departamentos, "Datos recuperados"));
        } catch (error) {
            logMensaje(`Error al obtener departamentos: ${error.message}`);
            res.status(500).json(Respuesta.error(null, "Error al recuperar datos"));
        }
    }

    // 🔎 Obtener por ID
    async getDepartamentoById(req, res) {
        try {
            const id_departamento = req.params.id_departamento;
            const departamento = await Departamento.findByPk(id_departamento);

            if (!departamento) {
                return res.status(404).json(Respuesta.error(null, "Departamento no encontrado"));
            }

            res.json(Respuesta.exito(departamento, "Datos del departamento"));
        } catch (error) {
            logMensaje(`Error al buscar departamento: ${error.message}`);
            res.status(500).json(Respuesta.error(null, "Error al buscar departamento"));
        }
    }

    // ➕ Crear departamento
    async createDepartamento(req, res) {
        try {
            const { nombre, ubicacion, presupuesto } = req.body;

            if (!nombre) {
                return res.status(400).json(Respuesta.error(null, "El nombre es obligatorio"));
            }

            const nuevoDepartamento = await Departamento.create({
                nombre,
                ubicacion,
                presupuesto
            });

            res.status(201).json(Respuesta.exito(nuevoDepartamento, "Departamento creado"));
        } catch (error) {
            logMensaje(`Error al crear departamento: ${error.message}`);
            res.status(500).json(Respuesta.error(null, "Error al crear departamento"));
        }
    }

    // ✏️ Actualizar departamento
    async updateDepartamento(req, res) {
        try {
            const id_departamento = req.params.id_departamento;
            const datos = req.body;

            if (id_departamento != datos.id_departamento) {
                return res.status(400).json(Respuesta.error(null, "ID no coincide"));
            }

            const [filasActualizadas] = await Departamento.update(datos, {
                where: { id_departamento }
            });

            if (filasActualizadas === 0) {
                return res.status(404).json(Respuesta.error(null, "Departamento no encontrado"));
            }

            res.status(204).send();
        } catch (error) {
            logMensaje(`Error al actualizar: ${error.message}`);
            res.status(500).json(Respuesta.error(null, "Error al actualizar"));
        }
    }

    // 🗑️ Eliminar departamento
    async deleteDepartamento(req, res) {
        try {
            const id_departamento = req.params.id_departamento;
            const filasEliminadas = await Departamento.destroy({
                where: { id_departamento }
            });

            if (filasEliminadas === 0) {
                return res.status(404).json(Respuesta.error(null, "Departamento no encontrado"));
            }

            res.status(204).send();
        } catch (error) {
            logMensaje(`Error al eliminar: ${error.message}`);
            res.status(500).json(Respuesta.error(null, "Error al eliminar"));
        }
    }
}

module.exports = new DepartamentoController();