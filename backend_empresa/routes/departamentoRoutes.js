const express = require("express");
const router = express.Router();
const departamentoController = require("../controllers/departamentoController");

// Endpoints
router.get("/grafica", departamentoController.getGraficaDepartamento);
router.get("/", departamentoController.getAllDepartamentos);
router.get("/buscar", departamentoController.searchDepartamentoByNombre);
router.get("/:id_departamento", departamentoController.getDepartamentoById); 
router.post("/", departamentoController.createDepartamento);
router.put("/:id_departamento", departamentoController.updateDepartamento);
router.delete("/:id_departamento", departamentoController.deleteDepartamento);

module.exports = router;