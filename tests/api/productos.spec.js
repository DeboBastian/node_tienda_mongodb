
const request = require('supertest');
const app = require('../../app')
const mongoose = require('mongoose');


const Producto = require('../../models/product.model')

describe('Api de products', () => {

    beforeAll(async () => {
        // Conecto a base de datos
        await mongoose.connect('mongodb://127.0.0.1:27017/tienda_online')
        // const response = await request(app).get('/api/products').send();
    })

    afterAll(async () => {
        //Desconecto de la base de datos
        await mongoose.disconnect()
    });


    describe('Pruebas de GET /api/products', () => {

        let response;
        beforeAll(async () => {
            response = await request(app).get('/api/products').send();
        });

        test('debería funcionar la Petición', () => {
            expect(response.statusCode).toBe(200);
        });

        test('debería responder con un JSON', () => {
            expect(response.headers['content-type']).toContain('application/json');
        });

        test('debería responder con un array', () => {
            expect(response.body).toBeInstanceOf(Array);
        });
    })


    describe('Pruebas de POST /api/products', () => {
        let response;
        const body = { name: 'Test', description: 'This is for tests', price: 98, department: 'test', available: true, stock: 21 }
        beforeAll(async () => {
            response = await request(app).post('/api/products').send(body);
        })

        afterAll(async () => {
            await Producto.deleteMany({ department: 'test' });
        });

        test('la URL debería funcionar', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('json')
        })


        test('debería devolver el campo _id', () => {
            expect(response.body._id).toBeDefined();
        });


        test('la respuesta debería tener los mismos valores que el objeto que inserto', () => {
            expect(response.body.name).toBe(body.name);
        });
    })


    describe('Pruebas de PUT /api/products', () => {
        let response;
        let newProduct;

        const body = { name: 'Test', description: 'This is for tests', price: 98, department: 'test', available: true, stock: 21 };
        beforeAll(async () => {
            //Creo un nuevo profucto especifico para las pruebas
            newProduct = await Producto.create(body);
            //Lanzo la peticion
            response = await request(app)
                .put(`/api/products/${newProduct._id}`)
                .send({ name: 'Producto Nuevo', stock: 229 })
        })

        afterAll(async () => {
            await Producto.findByIdAndDelete(newProduct._id)
        })


        test('La url debe existir y devolve un JSON', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        test('Deberiamos recibir el producto con los datos modificados', () => {
            expect(response.body.name).toBe('Producto Nuevo');
            expect(response.body.stock).toBe(229);
        })
    })


    describe('Pruebas de DELETE /api/products', () => {
        let response;
        let newProduct;

        const body = { name: 'Test', description: 'This is for tests', price: 98, department: 'test', available: true, stock: 21 };
        beforeAll(async () => {
            newProduct = await Producto.create(body)
            response = await request(app)
                .delete(`/api/products/${newProduct._id}`)
                .send()
        })

        test('La url debe existir y devolve un JSON', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('json');
        });

        test('deberia borrar el producto de la BD', async () => {
            const productFound = await Producto.findById(newProduct._id)
            expect(productFound).toBeNull();
        })
    })

})
