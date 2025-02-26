const express = require("express");
const router = express.Router();
const empleadoController = require("../controllers/empleadoController");

// Endpoints
router.get("/grafica", empleadoController.getGraficaEmpleados);
router.get("/buscar", empleadoController.searchEmpleadoByNombre);
router.get("/", empleadoController.getAllEmpleados);
router.get("/:id_empleado", empleadoController.getEmpleadoById);
router.post("/", empleadoController.createEmpleado);
router.put("/:id_empleado", empleadoController.updateEmpleado);
router.delete("/:id_empleado", empleadoController.deleteEmpleado);

module.exports = router;