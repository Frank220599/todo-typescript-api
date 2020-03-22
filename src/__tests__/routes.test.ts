import * as app from "../app";
const request = require('supertest');

describe('Api Test', () => {
    let token = null;

    it('POST /api/v1/auth/login', async done => {
        const res = await request(app)
            .post('/api/v1/auth/login')
            .send({email: 'example@gmail.com', password: '123456789'});
        token = res.body.token;
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('user');
        done()
    });

    it('POST /api/v1/post', async done => {
        const res = await request(app)
            .post('/api/v1/post')
            .set('Authorization', 'Bearer ' + token)
            .send({
                title: 'test is cool',
                categoryId: 1,
                contentRaw: '123123',
                contentHTML: 'aaaaa',
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('post');
        done()
    })
});