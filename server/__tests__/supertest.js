const request = require('supertest');
const server = 'http://localhost:8080';


describe('Route integration', () => {
    describe('/', () => {
        describe('GET', () => {
            it('responds with 200 status and text/html content type', () => {
                return request(server)
                    .get('/')
                    .expect('Content-Type', /text\/html/)
                    .expect(200);
            });
        });
    });

    describe('/user', () => {
        describe('GET', () => {
            it('responds with 200 status and text/html content type', () => {
                return request(server)
                
                    .get('/user')
                    .expect('Content-Type', /text\/html/)
                    .expect(200);
            })
            
        })

        describe('DELETE', () => {
            it('responds with 200 status and application/json content type', () => {
                return request(server)
                    .delete('/user/delete')
                    .expect('Content-Type', /application\/json/)
                    .expect(200);
            })
        })
    })

    describe('/wobbedrobe', () => {
        describe('GET', () => {
            it('responds with 200 status and text/html content type', () => {
                return request(server)
                    .get('/wobbedrobe')
                    .expect('Content-Type', /text\/html/)
                    .expect(200);
            })
        })
    })

    describe('/ootd', () => {
        describe('GET', () => {
            it('responds with 200 status and text/html content type', () => {
                return request(server)
                    .get('/ootd')
                    .expect('Content-Type', /text\/html/)
                    .expect(200);
            })

            it('responds with 200 status and application/json content type', () => {
                return request(server)
                    .get('/ootd/get/1')
                    .expect('Content-Type', /application\/json/)
                    .expect(200);
            })
        })

        describe('POST', () => {
            it('responds with 200 status and application/json content type', async () => {
                return request(server)
                    .post('/ootd/update/1')
                    .expect('Content-Type', /application\/json/)
                    .expect(200);
            })
        })
    })

    describe('Unknown route handler', () => {
        describe('POST', () => {
            it('responds with 404 status', async () => {
                return request(server)
                    .post('/some-invalid-route')
                    .expect('Content-Type', /text\/html/)
                    .expect(404);
            })
        })
        describe('DELETE', () => {
            it('responds with 404 status', async () => {
                return request(server)
                    .delete('/some-invalid-route')
                    .expect('Content-Type', /text\/html/)
                    .expect(404);
            })
        })
        describe('PUT', () => {
            it('responds with 404 status', async () => {
                return request(server)
                    .put('/some-invalid-route')
                    .expect('Content-Type', /text\/html/)
                    .expect(404);
            })
        })

        describe('GET', () => {
            it('responds with 200 status and text/html content type', () => {
                return request(server)
                    .get('/some-invalid-route')
                    .expect('Content-Type', /text\/html/)
                    .expect(200);
            })
        })
    })

    
})