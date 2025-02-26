const request = require("supertest");
const app = require("../index");

describe("🔧 Pruebas sobre la API de Empleados", () => {
  let createdEmpleadoId;

  test("✅ GET /api/empleado/grafica → Obtener datos para gráfica", async () => {
    const res = await request(app).get("/api/empleado/grafica");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.datos)).toBe(true);
  });

  test("✅ POST /api/empleado → Crear un empleado", async () => {
    const newEmpleado = {
      nombre: "Empleado Test",
      email: "test@empleado.com",
      salario: 3000,
      fecha_contratacion: "2023-01-01",
      id_departamento: 1 // Asegúrate de que exista un departamento con este ID
    };

    const res = await request(app).post("/api/empleado").send(newEmpleado);
    expect(res.statusCode).toBe(201);
    expect(res.body.datos).toHaveProperty("id_empleado");
    createdEmpleadoId = res.body.datos.id_empleado;
  });

  test("✅ GET /api/empleado/:id_empleado → Obtener empleado por ID", async () => {
    const res = await request(app).get(`/api/empleado/${createdEmpleadoId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.datos).toHaveProperty("id_empleado", createdEmpleadoId);
  });

  test("✅ PUT /api/empleado/:id_empleado → Actualizar empleado", async () => {
    const updateData = {
      id_empleado: createdEmpleadoId,
      nombre: "Empleado Actualizado",
      email: "actualizado@empleado.com",
      salario: 3500,
      fecha_contratacion: "2023-01-01",
      id_departamento: 1
    };

    const res = await request(app).put(`/api/empleado/${createdEmpleadoId}`).send(updateData);
    expect(res.statusCode).toBe(204);
  });

  test("✅ GET /api/empleado/buscar → Buscar empleados por nombre", async () => {
    const res = await request(app).get("/api/empleado/buscar?nombre=Actualizado");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.datos)).toBe(true);
  });

  test("✅ DELETE /api/empleado/:id_empleado → Eliminar empleado", async () => {
    const res = await request(app).delete(`/api/empleado/${createdEmpleadoId}`);
    expect(res.statusCode).toBe(204);
  });
});
