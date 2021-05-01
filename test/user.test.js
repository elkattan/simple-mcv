const supertest = require('supertest');

const app = require('../');

const server = supertest(app);

describe('Testing user controller', () => {
    const userName = 'TestUser';

    test('Create user', done => {
        server.post('/user')
        .send({ name: userName })
        .expect(res => {
            delete res.body.id;
        })
        .expect(201, {
            name: userName,
            pets: [] // new users have empty pets array
        }, done);
    });

    test('List users', done => {
        server.get('/users')
        .expect(200)
        .expect(res => {
            expect(res.body.length).toBe(4);
        })
        .end(done);
    });


    // TODO: Test the remaining controller methods
});
