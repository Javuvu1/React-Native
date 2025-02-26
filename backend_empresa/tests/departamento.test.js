const request = require("supertest");
const app = require("../index");

describe("🔧 Pruebas sobre la API de Departamentos", () => {
  let createdDeptId;

  test("✅ GET /api/departamentos → Obtener todos los departamentos", async () => {
    const res = await request(app).get("/api/departamentos");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.datos)).toBe(true);
  });

  test("✅ POST /api/departamentos → Crear un departamento", async () => {
    const newDept = { 
      nombre: "Departamento Test", 
      ubicacion: "Ciudad Test", 
      presupuesto: 5000 
    };
    const res = await request(app).post("/api/departamentos").send(newDept);
    expect(res.statusCode).toBe(201);
    expect(res.body.datos).toHaveProperty("id_departamento");
    createdDeptId = res.body.datos.id_departamento;
  });

  test("✅ GET /api/departamentos/:id_departamento → Obtener departamento por ID", async () => {
    const res = await request(app).get(`/api/departamentos/${createdDeptId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.datos).toHaveProperty("id_departamento", createdDeptId);
  });

  test("✅ PUT /api/departamentos/:id_departamento → Actualizar departamento", async () => {
    const updateData = { 
      id_departamento: createdDeptId, 
      nombre: "Departamento Actualizado", 
      ubicacion: "Ciudad Actualizada", 
      presupuesto: 7000 
    };
    const res = await request(app).put(`/api/departamentos/${createdDeptId}`).send(updateData);
    expect(res.statusCode).toBe(204);
  });

  test("✅ GET /api/departamentos/buscar → Buscar departamentos por nombre", async () => {
    // Se asume que la ruta para buscar es /api/departamentos/buscar?nombre=...
    const res = await request(app).get("/api/departamentos/buscar?nombre=Actualizado");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.datos)).toBe(true);
  });

  test("✅ DELETE /api/departamentos/:id_departamento → Eliminar departamento", async () => {
    const res = await request(app).delete(`/api/departamentos/${createdDeptId}`);
    expect(res.statusCode).toBe(204);
  });
});
