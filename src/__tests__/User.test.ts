import request from 'supertest';
import { getConnection } from 'typeorm';
import { app } from '../app';

import createConnection from '../database';

describe("Users",()=>{
    beforeAll(async()=>{
        const connection =await createConnection();
        await connection.runMigrations();
    })

    afterAll(async()=>{
        const connection = getConnection();
        await connection.dropDatabase();
        await connection.close();
    })

    it("Should be able to create a new user",async ()=>{
        const response = await request(app).post("/api/v1/users")
        .send({
            "name": "user271947",
            "latitude": -22.19934,
            "longitude": -45.278223,
            "deviceName": "micaella device",
            "token": "1234567"
        });

        expect(response.status).toBe(201);
    })

})