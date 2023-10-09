import { generateCPF, getStates } from '@brazilian-utils/brazilian-utils';
import faker from '@faker-js/faker';
import dayjs from 'dayjs';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import supertest from 'supertest';


import { cleanDb, generateValidToken } from '../helpers';
import { prisma } from '@/config';
import app, { init } from '@/app';
import { createUser } from '../factories';
import { createHotel, createRoomWithHotelId } from '../factories/hotels-factory';
import { createBooking } from '../factories/booking-factory';

beforeAll(async () => {
    await init();
    await cleanDb();
});

const server = supertest(app);

describe('GET /booking', () => {
    it('should respond with status 401 if no token is given', async () => {
        const { status } = await server.get('/booking');

        expect(status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();
        const { status } = await server.get('/booking').set('Authorization', `Bearer ${token}`);

        expect(status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is no session for given token', async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

        const { status } = await server.get('/booking').set('Authorization', `Bearer ${token}`);

        expect(status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('when token is valid', () => {

        it('should respond with status 400 when there is no booking for given user', async () => {
            const token = await generateValidToken();

            const { status } = await server.get('/booking').set('Authorization', `Bearer ${token}`);

            expect(status).toBe(httpStatus.NOT_FOUND);
        });

        it('should respond with status 200 when there is a reservation for a certain user', async () => {
            const user = await createUser()
            const token = await generateValidToken(user);
            const hotel = await createHotel()
            const room = await createRoomWithHotelId(hotel.id)
            const booking = await createBooking(user.id, room.id)
            console.log(booking)

       

            const response = await server.get('/booking').set('Authorization', `Bearer ${token}`);

            console.log(response.text)

            expect(response.status).toBe(200);
            expect(response.body).toMatchObject({
                id: booking.id,
                userId: user.id,
                roomId: room.id, 
                Room: expect.objectContaining({
                    id: room.id,
                    name: expect.any(String),
                    capacity: room.capacity,
                    hotelId: hotel.id,
                  })

            })
        });

    })
})


describe('POST /booking', () => {
    it('should respond with status 401 if no token is given', async () => {
        const { status } = await server.get('/booking');

        expect(status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();
        const { status } = await server.get('/booking').set('Authorization', `Bearer ${token}`);

        expect(status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is no session for given token', async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

        const { status } = await server.get('/booking').set('Authorization', `Bearer ${token}`);

        expect(status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('when token is valid', () => {

        it('should respond with status 400 when there is no booking for given user', async () => {
            const token = await generateValidToken();

            const { status } = await server.get('/booking').set('Authorization', `Bearer ${token}`);

            expect(status).toBe(httpStatus.NOT_FOUND);
        });

    })
})



describe('PUT /booking', () => {
    it('should respond with status 401 if no token is given', async () => {
        const { status } = await server.get('/booking');

        expect(status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();
        const { status } = await server.get('/booking').set('Authorization', `Bearer ${token}`);

        expect(status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is no session for given token', async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

        const { status } = await server.get('/booking').set('Authorization', `Bearer ${token}`);

        expect(status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('when token is valid', () => {

        it('should respond with status 400 when there is no booking for given user', async () => {
            const token = await generateValidToken();

            const { status } = await server.get('/booking').set('Authorization', `Bearer ${token}`);

            expect(status).toBe(httpStatus.NOT_FOUND);
        });

    })
})