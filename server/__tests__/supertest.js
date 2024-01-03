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
        })
    })

    describe('Unknown route handler', () => {
        describe('POST', () => {
            it('responds with 404 status and "Not Found" message', () => {
                return request(server)
                    .post('/some-invalid-route')
                    .expect('Content-Type', /text\/html/)
                    .expect(404);

            })
        })
    })
})