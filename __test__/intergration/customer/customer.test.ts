// import request from 'supertest';
// import express, { Express } from 'express';
// import customerRoutes from '../../../src/customer/customer.routes';
// import * as customerService from '../../../src/customer/customer.service';
// import app from "../../../src/index"


// jest.mock('../../../src/customer/customer.service');

// const mockedCustomerService = customerService as jest.Mocked<typeof customerService>;

// beforeAll(() => {
  
// });

// beforeEach(() => {
//     jest.clearAllMocks();
// });

// describe('Customer API Endpoints', () => {

//     // Test for POST /customer
//     describe('POST /customers', () => {
//         it('should create a new customer and return 200 with the new customer', async () => {
//             const newCustomerData = {
//                 firstName: 'John',
//         lastName: 'Doe',
//         email: 'john@example.com',
//         phoneNumber: '555-1234',
//         address: '1 Elm St',

       
//             };
//             const createdCustomer = { customerID: 1, ...newCustomerData };
//             mockedCustomerService.createCustomerService.mockResolvedValueOnce(createdCustomer);
           
           

//             const res = await request(app)
//                 .post('/customers')
//                 .send(newCustomerData);

//             expect(res.statusCode).toEqual(201);
//             expect(res.body).toEqual(createdCustomer);
//             expect(mockedCustomerService.createCustomerService).toHaveBeenCalledTimes(1);
//             expect(mockedCustomerService.createCustomerService).toHaveBeenCalledWith(newCustomerData);
//         });

//     });

  
//     });

    
//     describe('GET /customers', () => {
//         it('should return all customers and a 200 status', async () => {
//             const cus = [
//                 {  customerID: 1, firstName: 'John',lastName: 'Doe', email: 'john@example.com', phoneNumber: '555-1234',address: '1 Elm St'},
//                 {  customerID: 2, firstName: 'Jane',lastName: 'Smith', email: 'jane@example.com',phoneNumber: '555-5678', address: '2 Maple Ave'}
//             ];

//             mockedCustomerService.getAllCustomersService.mockResolvedValueOnce(cus);

//             const res = await request(app).get('/customers');

//             expect(res.statusCode).toEqual(200);
           
//             expect(mockedCustomerService.getAllCustomersService).toHaveBeenCalledTimes(1);
//         });

//         it('should return 404 if no customers are found', async () => {
//             mockedCustomerService.getAllCustomersService.mockResolvedValueOnce([]); // Simulate no bookings

//             const res = await request(app).get('/customers');

//             expect(res.statusCode).toEqual(404);
//             expect(res.body).toEqual({ message: 'No customers found' });
//             expect(mockedCustomerService.getAllCustomersService).toHaveBeenCalledTimes(1);
//         });

//         it('should return 500 if an unexpected error occurs during fetching all customers', async () => {
//             const error = new Error('Database timeout');
//             mockedCustomerService.getAllCustomersService.mockRejectedValueOnce(error);

//             const res = await request(app).get('/customers');

//             expect(res.statusCode).toEqual(500);
           
//         });
//     });

//     // Test for GET /customers/:id
//     describe('GET /customers/:id', () => {
//         it('should return a single customer by ID and a 200 status', async () => {
//             const customerId = 1;
//             const customer = { customerID: customerId,  firstName: 'John', lastName: 'Doe', email: 'john@example.com', phoneNumber: '555-1234',address:'1 Elm St' };

//             mockedCustomerService.getCustomerByIdService.mockResolvedValueOnce(customer);

//             const res = await request(app).get(`/customers/${customerId}`);

//             expect(res.statusCode).toEqual(200);
//             expect(res.body).toEqual({ Customer: customer }); // Note the 'Car' key from your controller
//             expect(mockedCustomerService.getCustomerByIdService).toHaveBeenCalledTimes(1);
//             expect(mockedCustomerService.getCustomerByIdService).toHaveBeenCalledWith(customerId);
//         });

//         it('should return 404 if the customer ID is not found', async () => {
//             const customerId = 999;
//             mockedCustomerService.getCustomerByIdService.mockResolvedValueOnce(null); // Simulate not found

//             const res = await request(app).get(`/customers/${customerId}`);

//             expect(res.statusCode).toEqual(404);
//             expect(res.body).toEqual({ message: 'no customer' });
//             expect(mockedCustomerService.getCustomerByIdService).toHaveBeenCalledTimes(1);
//         });

//         it('should return 500 if an unexpected error occurs during fetching by ID', async () => {
//             const customerId = 1;
//             const error = new Error('Network error');
//             mockedCustomerService.getCustomerByIdService.mockRejectedValueOnce(error);

//             const res = await request(app).get(`/customers/${customerId}`);

//             expect(res.statusCode).toEqual(500);
//             expect(res.body).toEqual({ message: 'server error' });
//             expect(mockedCustomerService.getCustomerByIdService).toHaveBeenCalledTimes(1);
//         });
//     });

//     // Test for PUT /customers/:id
//     describe('PUT /customers/:id', () => {
//         it('should update a customer and return 200 with the updated booking', async () => {
//             const customerId = 1;
//             const updateData = { phoneNumber: '111-2222', address: 'Sec. 58' };
//             const updatedCustomer = { customerID: customerId, firstName: ' Jane', lastName: 'Smith', email: 'jane@example.com', phoneNumber: '111-2222', address: 'Sec. 58' };

//             mockedCustomerService.updateCustomerService.mockResolvedValueOnce(updatedCustomer);

//             const res = await request(app)
//                 .put(`/customers/${customerId}`)
//                 .send(updateData);

//             expect(res.statusCode).toEqual(200);
//             expect(res.body).toEqual(updatedCustomer);
//             expect(mockedCustomerService.updateCustomerService).toHaveBeenCalledTimes(1);
//             expect(mockedCustomerService.updateCustomerService).toHaveBeenCalledWith(customerId, updateData);
//         });

//         it('should return 404 if the car to update is not found', async () => {
//             const customerId = 999;
//             const updateData = { address: 'Sec. 58' };
//             mockedCustomerService.updateCustomerService.mockResolvedValueOnce(null); // Simulate not found

//             const res = await request(app)
//                 .put(`/customers/${customerId}`)
//                 .send(updateData);

//             expect(res.statusCode).toEqual(404);
//             expect(res.body).toEqual({ message: 'Customer not found' });
//             expect(mockedCustomerService.updateCustomerService).toHaveBeenCalledTimes(1);
//         });

//     });

//     // Test for DELETE /customers/:id
//     describe('DELETE /customers/:id', () => {
//         it('should delete a customer and return 200 success message', async () => {
//             const customerId = 1;
//             mockedCustomerService.deleteCustomerService.mockResolvedValueOnce(true); // Simulate successful deletion

//             const res = await request(app).delete(`/customers/${customerId}`);

//             expect(res.statusCode).toEqual(200);
//             expect(res.body).toEqual({ message: 'Customer deleted successfully' });
//             expect(mockedCustomerService.deleteCustomerService).toHaveBeenCalledTimes(1);
//             expect(mockedCustomerService.deleteCustomerService).toHaveBeenCalledWith(customerId);
//         });

//         it('should return 404 if the customer to delete is not found', async () => {
//             const customerId = 999;
//             mockedCustomerService.deleteCustomerService.mockResolvedValueOnce(false); // Simulate not found

//             const res = await request(app).delete(`/customers/${customerId}`);

//             expect(res.statusCode).toEqual(404);
//             expect(res.body).toEqual({ message: 'Customer not found' });
//             expect(mockedCustomerService.deleteCustomerService).toHaveBeenCalledTimes(1);
//         });

//         it('should return 500 if an unexpected error occurs during deletion', async () => {
//             const customerId = 1;
//             const error = new Error('Database error during deletion');
//             mockedCustomerService.deleteCustomerService.mockRejectedValueOnce(error);

//             const res = await request(app).delete(`/customers/${customerId}`);

//             expect(res.statusCode).toEqual(500);
//             expect(res.body).toEqual({ message: "Error deleting customer" });
           
         
//         });
//     });
