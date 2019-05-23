const server = require("./server.js");
const request = require('supertest');
const db = require('../data/dbConfig');
const bLeader = require('../bandLeaders/bandLeadersModel')

describe('server.js', () => {

    beforeEach(async () => {
        await db('bandleaders').truncate();
    })

    it('should be able to identify the testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    })

    describe('GET/ endpoint', () => {
        it('should return status 200 OK', async () => {
            const res = await request(server).get('/');
            expect(res.status).toBe(200);
        })

        it('should return JSON', async () => {
            const res = await request(server).get('/');
            expect(res.type).toBe('application/json')
        })

        it('should return { api: "up" }', async () => {
            const res = await request(server).get('/');
            expect(res.body).toEqual({ api: "up" });
          })
    })

})