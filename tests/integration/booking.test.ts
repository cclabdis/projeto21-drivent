import { generateCPF, getStates } from '@brazilian-utils/brazilian-utils';
import faker from '@faker-js/faker';
import dayjs from 'dayjs';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import supertest from 'supertest';


import { cleanDb, generateValidToken } from '../helpers';
import { prisma } from '@/config';
import app, { init } from '@/app';
import { createEnrollmentWithAddress, createPayment, createTicket, createTicketType, createUser } from '../factories';
import { createHotel, createRoomWithHotelId } from '../factories/hotels-factory';
import { createBooking } from '../factories/booking-factory';
import { TicketStatus } from '@prisma/client';

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

            const response = await server.get('/booking').set('Authorization', `Bearer ${token}`);

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

        it('should respond with status 403 when there is no booking for given user', async () => {
            const token = await generateValidToken();
            const { status } = await server.post('/booking').set('Authorization', `Bearer ${token}`);
            expect(status).toBe(httpStatus.FORBIDDEN);
        });
        it('should respond with status 400 when body is not valid', async () => {
            const token = await generateValidToken();
            const body = { [faker.lorem.word()]: faker.lorem.word() };
            const response = await server.post('/enrollments').set('Authorization', `Bearer ${token}`).send(body);

            expect(response.status).toBe(httpStatus.BAD_REQUEST);
        });
        it('should respond with status 403 the event is remote', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const ticketType = await createTicketType(true, false);
            const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
            await createPayment(ticket.id, ticketType.price);

            const hotel = await createHotel();
            const room = await createRoomWithHotelId(hotel.id)

            const response = await server.post('/booking').set('Authorization', `Bearer ${token}`).send({
                userId: user.id,
                roomId: room.id
            });

            expect(response.status).toBe(httpStatus.FORBIDDEN);
        });
        it('should respond with status 403 when the event was not paid', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const ticketType = await createTicketType(true, true);
            await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);


            const hotel = await createHotel();
            const room = await createRoomWithHotelId(hotel.id)

            const response = await server.post('/booking').set('Authorization', `Bearer ${token}`).send({
                userId: user.id,
                roomId: room.id
            });

            expect(response.status).toBe(httpStatus.FORBIDDEN);
        });
        it('must respond with status 403 when the event does not include a hotel', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const ticketType = await createTicketType(true, false);
            const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
            await createPayment(ticket.id, ticketType.price);

            const hotel = await createHotel();
            const room = await createRoomWithHotelId(hotel.id)

            const response = await server.post('/booking').set('Authorization', `Bearer ${token}`).send({
                userId: user.id,
                roomId: room.id
            });

            expect(response.status).toBe(httpStatus.FORBIDDEN);
        });
        it('should respond with status 403 when room is full', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const ticketType = await createTicketType(true, false);
            const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
            await createPayment(ticket.id, ticketType.price);

            const hotel = await createHotel();
            const room = await createRoomWithHotelId(hotel.id, 0)

            const response = await server.post('/booking').set('Authorization', `Bearer ${token}`).send({
                userId: user.id,
                roomId: room.id
            });

            expect(response.status).toBe(httpStatus.FORBIDDEN);
        });
        it('should respond with status 404 when the room does not exist', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const ticketType = await createTicketType(false, true);
            const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
            await createPayment(ticket.id, ticketType.price);


            const response = await server.post('/booking').set('Authorization', `Bearer ${token}`).send({
                userId: user.id,
                roomId: 100
            });

            expect(response.status).toBe(httpStatus.NOT_FOUND);
        });
        it('must respond with status 200 with the id when you can make the reservation', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const ticketType = await createTicketType(false, true);
            const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
            await createPayment(ticket.id, ticketType.price);

            const hotel = await createHotel();
            const room = await createRoomWithHotelId(hotel.id)

            const response = await server.post('/booking').set('Authorization', `Bearer ${token}`).send({
                userId: user.id,
                roomId: room.id
            });

            expect(response.status).toBe(httpStatus.OK);
            expect(response.body).toMatchObject({
                bookingId: expect.any(Number)
            });
        });
        it('should insert a new ticket in the database', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const ticketType = await createTicketType(false, true);
            const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
            await createPayment(ticket.id, ticketType.price);

            const hotel = await createHotel();
            const room = await createRoomWithHotelId(hotel.id)

            const beforeCount = await prisma.booking.count();

            await server.post('/booking').set('Authorization', `Bearer ${token}`).send({
                userId: user.id,
                roomId: room.id
            });


            const afterCount = await prisma.booking.count();

            expect(beforeCount).toEqual(2);
            expect(afterCount).toEqual(3);
        })
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

            const { status } = await server.put('/booking').set('Authorization', `Bearer ${token}`);

            expect(status).toBe(httpStatus.NOT_FOUND);
        });
        it('should respond with status 403 when the user does not have a reservation', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const ticketType = await createTicketType(false, true);
            const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
            await createPayment(ticket.id, ticketType.price);

            const hotel = await createHotel();
            const room = await createRoomWithHotelId(hotel.id)

            const body = {
                userId: user.id,
                roomId: room.id
            }
            const response = await server.put(`/booking/${0}`).set('Authorization', `Bearer ${token}`).send(body);

            expect(response.status).toBe(httpStatus.FORBIDDEN);
        });

        it('should respond with status 403 when room is full', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const ticketType = await createTicketType(false, true);
            const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
            await createPayment(ticket.id, ticketType.price);

            const hotel = await createHotel();
            const room = await createRoomWithHotelId(hotel.id)

            const booking = await createBooking(user.id, room.id)

            const hotelReservation = await createHotel();
            const roomReservation = await createRoomWithHotelId(hotelReservation.id, 0)

            const body = {
                userId: user.id,
                roomId: roomReservation.id
            }
            const response = await server.put(`/booking/${booking.id}`).set('Authorization', `Bearer ${token}`).send(body);

            expect(response.status).toBe(httpStatus.FORBIDDEN);
        });
        it('should respond with status 404 when the room does not exist', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const ticketType = await createTicketType(false, true);
            const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
            await createPayment(ticket.id, ticketType.price);

            const hotel = await createHotel();
            const room = await createRoomWithHotelId(hotel.id)

            const booking = await createBooking(user.id, room.id)

            const body = {
                userId: user.id,
                roomId: 0
            }
            const response = await server.put(`/booking/${booking.id}`).set('Authorization', `Bearer ${token}`).send(body);

            expect(response.status).toBe(httpStatus.NOT_FOUND);
        }); 
        it('must respond with status 200 with the id when you can make the reservation', async () => {
            const user = await createUser();
            const token = await generateValidToken(user);
            const enrollment = await createEnrollmentWithAddress(user);
            const ticketType = await createTicketType(false, true);
            const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
            await createPayment(ticket.id, ticketType.price);

            const hotel = await createHotel();
            const room = await createRoomWithHotelId(hotel.id)
            const room2 = await createRoomWithHotelId(hotel.id)

            const booking = await createBooking(user.id, room.id)

            const body = {
                userId: user.id,
                roomId: room2.id
            }
            const response = await server.put(`/booking/${booking.id}`).set('Authorization', `Bearer ${token}`).send(body);

            expect(response.status).toBe(httpStatus.OK);
            expect(response.body).toEqual(
                expect.objectContaining({
                    bookingId: expect.any(Number),
                }),
            );
        });

    })
})