import httpStatus from 'http-status';
import supertest from 'supertest';
import { createBooking, createEnrollmentWithAddress, createEvent, createHotel, createRoom, createTicket, createTicketType, createUser } from '../factories';
import { cleanDb, generateValidToken } from '../helpers';
import app, { init } from '@/app';
import faker from '@faker-js/faker';
import * as jwt from 'jsonwebtoken';
import { Hotel } from '@prisma/client';

beforeAll(async () => {
    await init();
    await cleanDb();
});

const server = supertest(app);


describe('GET /hotels', () => {
    it('should respond with status 401 if no token is given', async () => {
        const response = await server.get('/hotels');

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();

        const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is no session for given token', async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

        const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe('when token is valid', () => {
        it('must respond with status 401 when there are no registrations', async () => {
            const token = await generateValidToken();
            const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
            expect(response.status).toEqual(httpStatus.NOT_FOUND);
        });

        it('should respond with status 404 not yet paid', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const hotel = await createHotel()
            const room = await createRoom(hotel.id)
            const booking = await createBooking(user.id, room.id)
            const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

            expect(response.status).toEqual(httpStatus.NOT_FOUND);
        });

        it('should respond with status 200 and hotels list when everything is correct', async () => {
            const user = await createUser()
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user)
            const ticketType = await createTicketType(false, true)

            await createTicket(enrollment.id, ticketType.id, "PAID")

            const hoteluser1 = await createHotel()
            const hoteluser2 = await createHotel()
            const hotels = [hoteluser1, hoteluser2]

            hotels.map((hotel) => ({
                id: hotel.id,
                image: hotel.image,
                name: hotel.name,
                createdAt: hotel.createdAt.toISOString(),
                updatedAt: hotel.updatedAt.toISOString(),
            }));

            const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(httpStatus.OK);
            expect(response.body).toHaveLength(3)
        })

    })



});

describe('GET /hotels/:hotelId', () => {
    it('should respond with status 401 if no token is given', async () => {
        const { status } = await server.get('/hotels/1');
        expect(status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if given token is not valid', async () => {
        const token = faker.lorem.word();
        const { status } = await server.get('/hotels/1').set('Authorization', `Bearer ${token}`);
        expect(status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 if there is no session for given token', async () => {
        const userWithoutSession = await createUser();
        const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
        const { status } = await server.get('/hotels/1').set('Authorization', `Bearer ${token}`);
        expect(status).toBe(httpStatus.UNAUTHORIZED);
    });
    describe('when token is valid', () => {
        it('should respond with status 404 when the hotel isnt found', async () => {
            const user = await createUser()
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user)
            const ticketType = await createTicketType(false, true)

            await createTicket(enrollment.id, ticketType.id, "PAID")

            const response = await server.get('/hotels/1').set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(httpStatus.NOT_FOUND);
        })

        it('should respond with status 404 if there is no enrollment for given user', async () => {
            const token = await generateValidToken();
            const hotel = await createHotel();
            const response = await server.get(`/hotels/${hotel.id}`).set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(httpStatus.NOT_FOUND);
        })

        it('should respond with status 402 if the ticket for given users enrollment doesnt include hotel', async () => {
            const user = await createUser()
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user)
            const ticketType = await createTicketType(false, false)
            const ticket = await createTicket(enrollment.id, ticketType.id, "PAID")
            const hotel = await createHotel();
            const response = await server.get(`/hotels/${hotel.id}`).set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(httpStatus.PAYMENT_REQUIRED);
        })
        it('should respond with status 200', async () => {
            const user = await createUser()
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user)
            const ticketType = await createTicketType(false, true)
            const ticket = await createTicket(enrollment.id, ticketType.id, "PAID")
            const hotel = await createHotel();
        
            const response = await server.get(`/hotels/${hotel.id}`).set('Authorization', `Bearer ${token}`);
            expect(response.status).toBe(httpStatus.OK);
        

    })
})

    //         )
    //     })
    // })
    // })

    // type TestHotel = {
    //     id: number;
    //     image: string;
    //     name: string;
    //     createdAt: string;
    //     updatedAt: string;
    //     Rooms?: TestRoom[];
    // }

    // type TestRoom = {
    //     id: number;
    //     name: string;
    //     capacity: number;
    //     hotelId: number;
    //     createdAt: string;
    //     updatedAt: string;
    // }
})