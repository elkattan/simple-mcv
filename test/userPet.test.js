const supertest = require('supertest');

const app = require('../');

const server = supertest(app);

describe('Testing user-pets controller', () => {
    const user1 = 2;
    const user2 = 51;

    test(`Connecting existing user with a pet`, done => {
        server.post(`/user/${user1}/pet`)
        .send({ pet: { name: 'Leo' }})
        .expect(201, done);
    });

    // TODO: This test will fail, it should't (try `yarn test`)
    test(`Connecting nonexisting user with a pet`, done => {
        server.post(`/user/${user2}/pet`)
        .send({ pet: { name: 'Misho' }})
        .expect(404, done);
    });
});
