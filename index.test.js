const request = require('supertest');
const app = require('./index');

describe('Pruebas de Endpoints', () => {

    // Prueba del endpoint GET /
    it('Debería responder con el mensaje de saludo', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('¡Hola desde la ruta raíz!');
    });

    //   // Prueba del endpoint GET /general
    //   it('Debería responder con datos de prueba', async () => {
    //     const response = await request(app).get('/general');
    //     expect(response.status).toBe(200);
    //     expect(response.body).toEqual({ todo: /* datos de prueba esperados */ });
    //   });

    //   // Prueba del endpoint POST /general
    //   it('Debería crear un nuevo elemento y responder con el ID', async () => {
    //     const newData = { title: 'Nueva tarea', done: false };
    //     const response = await request(app).post('/general').send(newData);
    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('todoId');
    //   });

    //   // Prueba del endpoint GET /general/:todoId
    //   it('Debería responder con los datos del elemento', async () => {
    //     const todoId = /* ID válido */;
    //     const response = await request(app).get(`/general/${todoId}`);
    //     expect(response.status).toBe(200);
    //     expect(response.body).toEqual({ todo: /* datos del elemento esperados */ });
    //   });

    //   // Prueba del endpoint PUT /general/:todoId
    //   it('Debería actualizar el elemento y responder con los datos actualizados', async () => {
    //     const todoId = /* ID válido */;
    //     const updatedData = { title: 'Tarea actualizada', done: true };
    //     const response = await request(app)
    //       .put(`/general/${todoId}`)
    //       .send(updatedData);
    //     expect(response.status).toBe(200);
    //     expect(response.body).toEqual({ todoId, ...updatedData });
    //   });

    //   // Prueba del endpoint DELETE /general/:todoId
    //   it('Debería eliminar el elemento y responder con éxito', async () => {
    //     const todoId = /* ID válido */;
    //     const response = await request(app).delete(`/general/${todoId}`);
    //     expect(response.status).toBe(200);
    //     expect(response.body).toEqual({ success: true });
    //   });
});
