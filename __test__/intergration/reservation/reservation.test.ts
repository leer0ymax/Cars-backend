// import request from 'supertest';
// import express, { Express } from 'express';
// import reservationRoutes from '../../../src/reservation/reservation.routes';
// import * as reservationService from '../../../src/reservation/reservation.service';
// import app from "../../../src/index"


// jest.mock('../../../src/reservation/reservation.service');

// const mockedReservationService = reservationService as jest.Mocked<typeof reservationService>;

// beforeAll(() => {
  
// });

// beforeEach(() => {
//     jest.clearAllMocks();
// });

// describe('Reservation API Endpoints', () => {

//     // Test for POST /reservation
//     describe('POST /reservations', () => {
//         it('should create a new reservation and return 200 with the new reservation', async () => {
//             const newReservationData = {
//                 reservationID: '1',
//          customerID: '1',
//          carID: '1',
//          reservationDate: '2020-02-02',
//          pickupDate: '2020-01-01',
//          returnDate: '2020-02-02',


       
//             };
//             const createdReservation = { reservationID: 1, ...newReservationData };
//             mockedReservationService.createReservationService.mockResolvedValueOnce(createdReservation);
           
           

//             const res = await request(app)
//                 .post('/reservations')
//                 .send(newReservationData);

//             // expect(res.statusCode).toEqual(201);
//             // expect(res.body).toEqual(createdReservation);
//             // expect(mockedPaymentService.createReservationService).toHaveBeenCalledTimes(1);
//             // expect(mockedPaymentService.createReservationService).toHaveBeenCalledWith(newReservationData);
//         });

//     });

  
//     });

    
//     describe('GET /reservations', () => {
//         it('should return all reservations and a 200 status', async () => {
//             const ins = [
//                 {  reservationID: 1, reservationID: '1',customerID: '3', carID: '2', reservationDate: '2020-09-09', pickupDate: '2020-08-08', returnDate: '2020-10-10'},
//                 {  reservationID: 2, reservationID: '2',customerID: '4', carID: '3', reservationDate: '2020-10-09', pickupDate: '2020-09-09', returnDate: '2020-11-11'}
//             ];

//             mockedReservationService.getAllReservationsService.mockResolvedValueOnce(ins);

//             const res = await request(app).get('/reservations');

//             expect(res.statusCode).toEqual(200);
           
//             expect(mockedReservationService.getAllReservationsService).toHaveBeenCalledTimes(1);
//         });

//         it('should return 404 if no reservations are found', async () => {
//             mockedReservationService.getAllReservationsService.mockResolvedValueOnce([]); // Simulate no payments

//             const res = await request(app).get('/reservations');

//             expect(res.statusCode).toEqual(404);    
//             expect(res.body).toEqual({ message: 'No Reservation found' });
//             expect(mockedReservationService.getAllReservationsService).toHaveBeenCalledTimes(1);
//         });

//         it('should return 500 if an unexpected error occurs during fetching all reservations', async () => {
//             const error = new Error('Database timeout');
//             mockedReservationService.getAllReservationsService.mockRejectedValueOnce(error);

//             const res = await request(app).get('/reservations');

//             expect(res.statusCode).toEqual(500);
           
//         });
//     });

//     // Test for GET /reservations/:id
//     describe('GET /reservations/:id', () => {
//         it('should return a single reservation by ID and a 200 status', async () => {
//             const reservationId = 1;
//             const reservation = { reservationID: reservationId,  customerID: '1', carID: '2', reservationDate: '2020-02-02', pickupDate: '2020-01-01', returnDate: '2020-02-02' };

//             mockedReservationService.getReservationByIdService.mockResolvedValueOnce(reservation);

//             const res = await request(app).get(`/reservations/${reservationId}`);

//             expect(res.statusCode).toEqual(200);
//             expect(res.body).toEqual({ Reservation: reservation }); // Note the 'payment' key from your controller
//             expect(mockedReservationService.getReservationByIdService).toHaveBeenCalledTimes(1);
//             expect(mockedReservationService.getReservationByIdService).toHaveBeenCalledWith(reservationId);
//         });

//         it('should return 404 if the reservation ID is not found', async () => {
//             const reservationId = 999;
//             mockedReservationService.getReservationByIdService.mockResolvedValueOnce(null); // Simulate not found

//             const res = await request(app).get(`/reservations/${reservationId}`);

//             expect(res.statusCode).toEqual(404);
//             expect(res.body).toEqual({ message: 'no Reservation' });
//             expect(mockedReservationService.getReservationByIdService).toHaveBeenCalledTimes(1);
//         });

//         it('should return 500 if an unexpected error occurs during fetching by ID', async () => {
//             const reservationId = 1;
//             const error = new Error('Network error');
//             mockedReservationService.getReservationByIdService.mockRejectedValueOnce(error);

//             const res = await request(app).get(`/reservations/${reservationId}`);

//             expect(res.statusCode).toEqual(500);
//             expect(res.body).toEqual({ message: 'server error' });
//             expect(mockedReservationService.getReservationByIdService).toHaveBeenCalledTimes(1);
//         });
//     });

//     // Test for PUT /reservations/:id
//     describe('PUT /reservations/:id', () => {
//         it('should update a reservation and return 200 with the updated reservation', async () => {
//             const reservationId = 1;
//             const updateData = { amount: '4000', paymentMethod: 'Debit Card' };
//             const updatedReservation = { reservationID: reservationId, customerID: ' 2', carID: '4', reservationDate: '2020-02-02', pickupDate: '2020-01-01', returnDate: '2020-02-02' };

//             mockedReservationService.updateReservationService.mockResolvedValueOnce(updatedReservation);

//             const res = await request(app)
//                 .put(`/reservations/${reservationId}`)
//                 .send(updateData);

//             expect(res.statusCode).toEqual(200);
//             expect(res.body).toEqual(updatedReservation);
//             expect(mockedReservationService.updateReservationService).toHaveBeenCalledTimes(1);
//             expect(mockedReservationService.updateReservationService).toHaveBeenCalledWith(reservationId, updateData);
//         });

//         it('should return 404 if the reservation to update is not found', async () => {
//             const reservationId = 999;
//             const updateData = { amount: '5800' };
//             mockedReservationService.updateReservationService.mockResolvedValueOnce(null); // Simulate not found

//             const res = await request(app)
//                 .put(`/reservations/${reservationId}`)
//                 .send(updateData);

//             expect(res.statusCode).toEqual(404);
//             expect(res.body).toEqual({ message: 'Reservation not found' });
//             expect(mockedReservationService.updateReservationService).toHaveBeenCalledTimes(1);
//         });

//     });

//     // Test for DELETE /reservations/:id
//     describe('DELETE /reservations/:id', () => {
//         it('should delete a reservation and return 200 success message', async () => {
//             const reservationId = 1;
//             mockedReservationService.deleteReservationService.mockResolvedValueOnce(true); // Simulate successful deletion

//             const res = await request(app).delete(`/reservations/${reservationId}`);

//             expect(res.statusCode).toEqual(200);
//             expect(res.body).toEqual({ message: 'Reservation deleted successfully' });
//             expect(mockedReservationService.deleteReservationService).toHaveBeenCalledTimes(1);
//             expect(mockedReservationService.deleteReservationService).toHaveBeenCalledWith(reservationId);
//         });

//         it('should return 404 if the reservation to delete is not found', async () => {
//             const reservationId = 999;
//             mockedReservationService.deleteReservationService.mockResolvedValueOnce(false); // Simulate not found

//             const res = await request(app).delete(`/reservations/${reservationId}`);

//             expect(res.statusCode).toEqual(404);
//             expect(res.body).toEqual({ message: 'Reservation not found' });
//             expect(mockedReservationService.deleteReservationService).toHaveBeenCalledTimes(1);
//         });

//         it('should return 500 if an unexpected error occurs during deletion', async () => {
//             const reservationId = 1;
//             const error = new Error('Database error during deletion');
//             mockedReservationService.deleteReservationService.mockRejectedValueOnce(error);

//             const res = await request(app).delete(`/reservations/${reservationId}`);

//             expect(res.statusCode).toEqual(500);
//             expect(res.body).toEqual({ message: "server error" });
           
         
//         });
//     });