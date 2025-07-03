// import request from 'supertest';
// import express, { Express } from 'express';
// import paymentRoutes from '../../../src/payment/payment.routes';
// import * as paymentService from '../../../src/payment/payment.service';
// import app from "../../../src/index"
// import { PaymentTable } from '../../../src/Drizzle/schema';
// import db from '../../../src/Drizzle/db';

// jest.mock('../../../src/payment/payment.service');

// jest.mock('../../../src/Drizzle/db', () => ({
//     query:{
//         PaymentTable:{
//             findFirst: jest.fn()
//         }
//     }
// }))




// const mockedPaymentService = paymentService as jest.Mocked<typeof paymentService>;

// beforeAll(() => {
  
// });

// beforeEach(() => {
//     jest.clearAllMocks();
// });

// describe('Payment API Endpoints', () => {

//     // Test for POST /payment
//     describe('POST /payments', () => {
//         it('should create a new payment and return 200 with the new payment', async () => {

//         const newPaymentData = {
//          paymentID: 1,
//          bookingID: 1,
//          paymentDate: '2020-02-02',
//          amount: '4000.00',
//          paymentMethod: 'Cash'      
//             }
//             const createdPayment = {  ...newPaymentData };
//             mockedPaymentService.createPaymentService.mockResolvedValueOnce(createdPayment);
           
           

//             const res = await request(app)
//                 .post('/payments')
//                 .send(newPaymentData);

//             // expect(res.statusCode).toEqual(201);
//             // expect(res.body).toEqual(createdPayment);
//             // expect(mockedPaymentService.createPaymentService).toHaveBeenCalledTimes(1);
//             // expect(mockedPaymentService.createPaymentService).toHaveBeenCalledWith(newPaymentData);
//         });

//     });

  
//     });

    
//     describe('GET /payments', () => {
//         it('should return all payments and a 200 status', async () => {
//             const ins = [
//                 {  paymentID: 1, bookingID: 1,paymentDate: '2020-09-09', amount: '3400', paymentMethod: 'Cash'},
//                 {   paymentID: 2, bookingID: 2,paymentDate: '2020-10-09', amount: '690', paymentMethod: 'Mobile-Money'}
//             ];

//             mockedPaymentService.getAllPaymentsService.mockResolvedValueOnce(ins);

//             const res = await request(app).get('/payments');

//             expect(res.statusCode).toEqual(200);
           
//             expect(mockedPaymentService.getAllPaymentsService).toHaveBeenCalledTimes(1);
//         });

//         it('should return 404 if no payments are found', async () => {
//             mockedPaymentService.getAllPaymentsService.mockResolvedValueOnce([]); // Simulate no payments

//             const res = await request(app).get('/payments');

//             expect(res.statusCode).toEqual(404);    
//             expect(res.body).toEqual({ message: 'No Payment found' });
//             expect(mockedPaymentService.getAllPaymentsService).toHaveBeenCalledTimes(1);
//         });

//         it('should return 500 if an unexpected error occurs during fetching all payments', async () => {
//             const error = new Error('Database timeout');
//             mockedPaymentService.getAllPaymentsService.mockRejectedValueOnce(error);

//             const res = await request(app).get('/payments');

//             expect(res.statusCode).toEqual(500);
           
//         });
//     });

//     // Test for GET /payments/:id
//     describe('GET /payments/:id', () => {
//         it('should return a single payment by ID and a 200 status', async () => {
//             const paymentId = 1;
//             const payment = { paymentID: paymentId,  bookingID: '1', paymentDate: '2022-4-4', amount: '6700', paymentMethod: 'M-pesa'};

//             mockedPaymentService.getPaymentByIdService.mockResolvedValueOnce(payment);

//             const res = await request(app).get(`/payments/${paymentId}`);

//             expect(res.statusCode).toEqual(200);
//             expect(res.body).toEqual({ Payment: payment }); // Note the 'payment' key from your controller
//             expect(mockedPaymentService.getPaymentByIdService).toHaveBeenCalledTimes(1);
//             expect(mockedPaymentService.getPaymentByIdService).toHaveBeenCalledWith(paymentId);
//         });

//         it('should return 404 if the payment ID is not found', async () => {
//             const paymentId = 999;
//             (db.query.PaymentTable.findFirst as jest.Mock).mockResolvedValueOnce(undefined)
//             const result = await mockedPaymentService.getPaymentByIdService(paymentId)
//             expect(result).toBeUndefined()

//             const res = await request(app).get(`/payments/${paymentId}`);

//             expect(res.statusCode).toEqual(404);
//             expect(res.body).toEqual({ message: 'no Payment' });
//             expect(mockedPaymentService.getPaymentByIdService).toHaveBeenCalledTimes(1);
//         });

//         it('should return 500 if an unexpected error occurs during fetching by ID', async () => {
//             const paymentId = 1;
//             const error = new Error('Network error');
//             mockedPaymentService.getPaymentByIdService.mockRejectedValueOnce(error);

//             const res = await request(app).get(`/payments/${paymentId}`);

//             expect(res.statusCode).toEqual(500);
//             expect(res.body).toEqual({ message: 'server error' });
//             expect(mockedPaymentService.getPaymentByIdService).toHaveBeenCalledTimes(1);
//         });
//     });

//     // Test for PUT /payments/:id
//     describe('PUT /payments/:id', () => {
//         it('should update a payment and return 200 with the updated booking', async () => {
//             const paymentId = 1;
//             const updateData = { amount: '4000', paymentMethod: 'Debit Card' };
//             const updatedPayment = { paymentID: paymentId, bookingID: ' 2', paymentDate: '2022-3-4', amount: '4000', paymentMethod: 'Cash'};

//             mockedPaymentService.updatePaymentService.mockResolvedValueOnce(updatedPayment);

//             const res = await request(app)
//                 .put(`/payments/${paymentId}`)
//                 .send(updateData);

//             expect(res.statusCode).toEqual(200);
//             expect(res.body).toEqual(updatedPayment);
//             expect(mockedPaymentService.updatePaymentService).toHaveBeenCalledTimes(1);
//             expect(mockedPaymentService.updatePaymentService).toHaveBeenCalledWith(paymentId, updateData);
//         });

//         it('should return 404 if the payment to update is not found', async () => {
//             const paymentId = 999;
//             const updateData = { amount: '5800' };
//             mockedPaymentService.updatePaymentService.mockResolvedValueOnce(null); // Simulate not found

//             const res = await request(app)
//                 .put(`/payments/${paymentId}`)
//                 .send(updateData);

//             expect(res.statusCode).toEqual(404);
//             expect(res.body).toEqual({ message: 'Payment not found' });
//             expect(mockedPaymentService.updatePaymentService).toHaveBeenCalledTimes(1);
//         });

//     });

//     // Test for DELETE /payments/:id
//     describe('DELETE /payments/:id', () => {
//         it('should delete a payment and return 200 success message', async () => {
//             const paymentId = 1;
//             mockedPaymentService.deletePaymentService.mockResolvedValueOnce(true); // Simulate successful deletion

//             const res = await request(app).delete(`/payments/${paymentId}`);

//             expect(res.statusCode).toEqual(200);
//             expect(res.body).toEqual({ message: 'Payment deleted successfully' });
//             expect(mockedPaymentService.deletePaymentService).toHaveBeenCalledTimes(1);
//             expect(mockedPaymentService.deletePaymentService).toHaveBeenCalledWith(paymentId);
//         });

//         it('should return 404 if the payment to delete is not found', async () => {
//             const paymentId = 999;
//             mockedPaymentService.deletePaymentService.mockResolvedValueOnce(false); // Simulate not found

//             const res = await request(app).delete(`/payments/${paymentId}`);

//             expect(res.statusCode).toEqual(404);
//             expect(res.body).toEqual({ message: 'Payment not found' });
//             expect(mockedPaymentService.deletePaymentService).toHaveBeenCalledTimes(1);
//         });

//         it('should return 500 if an unexpected error occurs during deletion', async () => {
//             const paymentId = 1;
//             const error = new Error('Database error during deletion');
//             mockedPaymentService.deletePaymentService.mockRejectedValueOnce(error);

//             const res = await request(app).delete(`/payments/${paymentId}`);

//             expect(res.statusCode).toEqual(500);
//             expect(res.body).toEqual({ message: "server error" });
           
         
//         });
//     });