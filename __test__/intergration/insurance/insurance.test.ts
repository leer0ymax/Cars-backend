// import request from 'supertest';
// import express, { Express } from 'express';
// import insuranceRoutes from '../../../src/insurance/insurance.routes';
// import * as insuranceService from '../../../src/insurance/insurance.service';
// import app from "../../../src/index"


// jest.mock('../../../src/insurance/insurance.service');

// const mockedInsuranceService = insuranceService as jest.Mocked<typeof insuranceService>;

// beforeAll(() => {
  
// });

// beforeEach(() => {
//     jest.clearAllMocks();
// });

// describe('Insurance API Endpoints', () => {

//     // Test for POST /insurance
//     describe('POST /insurances', () => {
//         it('should create a new insurance and return 200 with the new insurance', async () => {
//             const newInsuranceData = {
//          carID: '1',
//          insuranceProvider: 'Marinair',
//          policyNumber: '3546',
//          startDate: '2020-02-02',
//          endDate: ' 2020-03-03',

       
//             };
//             const createdInsurance = { insuranceID: 1, ...newInsuranceData };
//             mockedInsuranceService.createInsuranceService.mockResolvedValueOnce(createdInsurance);
           
           

//             const res = await request(app)
//                 .post('/insurances')
//                 .send(newInsuranceData);

//             // expect(res.statusCode).toEqual(201);
//             // expect(res.body).toEqual(createdInsurance);
//             // expect(mockedInsuranceService.createInsuranceService).toHaveBeenCalledTimes(1);
//             // expect(mockedInsuranceService.createInsuranceService).toHaveBeenCalledWith(newInsuranceData);
//         });

//     });

  
//     });

    
//     describe('GET /insurances', () => {
//         it('should return all insurances and a 200 status', async () => {
//             const ins = [
//                 {  insuranceID: 1, carID: '1',insuranceProvider: 'Doe', policyNumber: '3452346', startDate: '2020-02-02',endDate: '2020-03-03'},
//                 {   insuranceID: 2, carID: '2',insuranceProvider: 'Marinair', policyNumber: '2346', startDate: '2020-03-02',endDate: '2020-04-03'}
//             ];

//             mockedInsuranceService.getAllInsurancesService.mockResolvedValueOnce(ins);

//             const res = await request(app).get('/insurances');

//             expect(res.statusCode).toEqual(200);
           
//             expect(mockedInsuranceService.getAllInsurancesService).toHaveBeenCalledTimes(1);
//         });

//         it('should return 404 if no insurances are found', async () => {
//             mockedInsuranceService.getAllInsurancesService.mockResolvedValueOnce([]); // Simulate no insurances

//             const res = await request(app).get('/insurances');

//             expect(res.statusCode).toEqual(404);
//             expect(res.body).toEqual({ message: 'No insurances found' });
//             expect(mockedInsuranceService.getAllInsurancesService).toHaveBeenCalledTimes(1);
//         });

//         it('should return 500 if an unexpected error occurs during fetching all insurances', async () => {
//             const error = new Error('Database timeout');
//             mockedInsuranceService.getAllInsurancesService.mockRejectedValueOnce(error);

//             const res = await request(app).get('/insurances');

//             expect(res.statusCode).toEqual(500);
           
//         });
//     });

//     // Test for GET /insurances/:id
//     describe('GET /insurances/:id', () => {
//         it('should return a single insurance by ID and a 200 status', async () => {
//             const insuranceId = 1;
//             const insurance = { insuranceID: insuranceId,  carID: '1', insuranceProvider: 'Doe', policyNumber: '34557', startDate: '2020-03-03',endDate:'2020-04-04' };

//             mockedInsuranceService.getInsuranceByIdService.mockResolvedValueOnce(insurance);

//             const res = await request(app).get(`/insurances/${insuranceId}`);

//             expect(res.statusCode).toEqual(200);
//             expect(res.body).toEqual({ Insurance: insurance }); // Note the 'insurance' key from your controller
//             expect(mockedInsuranceService.getInsuranceByIdService).toHaveBeenCalledTimes(1);
//             expect(mockedInsuranceService.getInsuranceByIdService).toHaveBeenCalledWith(insuranceId);
//         });

//         it('should return 404 if the insurance ID is not found', async () => {
//             const insuranceId = 999;
//             mockedInsuranceService.getInsuranceByIdService.mockResolvedValueOnce(null); // Simulate not found

//             const res = await request(app).get(`/insurances/${insuranceId}`);

//             expect(res.statusCode).toEqual(404);
//             expect(res.body).toEqual({ message: 'no insurance' });
//             expect(mockedInsuranceService.getInsuranceByIdService).toHaveBeenCalledTimes(1);
//         });

//         it('should return 500 if an unexpected error occurs during fetching by ID', async () => {
//             const insuranceId = 1;
//             const error = new Error('Network error');
//             mockedInsuranceService.getInsuranceByIdService.mockRejectedValueOnce(error);

//             const res = await request(app).get(`/insurances/${insuranceId}`);

//             expect(res.statusCode).toEqual(500);
//             expect(res.body).toEqual({ message: 'server error' });
//             expect(mockedInsuranceService.getInsuranceByIdService).toHaveBeenCalledTimes(1);
//         });
//     });

//     // Test for PUT /insurances/:id
//     describe('PUT /insurances/:id', () => {
//         it('should update a insurance and return 200 with the updated insurance', async () => {
//             const insuranceId = 1;
//             const updateData = { policyNumber: '34536', insuranceProvider: 'Marinair' };
//             const updatedInsurance = { insuranceID: insuranceId, carID: ' 2', insuranceProvider: 'Marinair', policyNumber: '34536', startDate: '2020-02-02', endDate: '2020-04-02' };

//             mockedInsuranceService.updateInsuranceService.mockResolvedValueOnce(updatedInsurance);

//             const res = await request(app)
//                 .put(`/insurances/${insuranceId}`)
//                 .send(updateData);

//             expect(res.statusCode).toEqual(200);
//             expect(res.body).toEqual(updatedInsurance);
//             expect(mockedInsuranceService.updateInsuranceService).toHaveBeenCalledTimes(1);
//             expect(mockedInsuranceService.updateInsuranceService).toHaveBeenCalledWith(insuranceId, updateData);
//         });

//         it('should return 404 if the insurance to update is not found', async () => {
//             const insuranceId = 999;
//             const updateData = { address: 'Sec. 58' };
//             mockedInsuranceService.updateInsuranceService.mockResolvedValueOnce(null); // Simulate not found

//             const res = await request(app)
//                 .put(`/insurances/${insuranceId}`)
//                 .send(updateData);

//             expect(res.statusCode).toEqual(404);
//             expect(res.body).toEqual({ message: 'Insurance not found' });
//             expect(mockedInsuranceService.updateInsuranceService).toHaveBeenCalledTimes(1);
//         });

//     });

//     // Test for DELETE /insurances/:id
//     describe('DELETE /insurances/:id', () => {
//         it('should delete a insurance and return 200 success message', async () => {
//             const insuranceId = 1;
//             mockedInsuranceService.deleteInsuranceService.mockResolvedValueOnce(true); // Simulate successful deletion

//             const res = await request(app).delete(`/insurances/${insuranceId}`);

//             expect(res.statusCode).toEqual(200);
//             expect(res.body).toEqual({ message: 'Insurance deleted successfully' });
//             expect(mockedInsuranceService.deleteInsuranceService).toHaveBeenCalledTimes(1);
//             expect(mockedInsuranceService.deleteInsuranceService).toHaveBeenCalledWith(insuranceId);
//         });

//         it('should return 404 if the insurance to delete is not found', async () => {
//             const insuranceId = 999;
//             mockedInsuranceService.deleteInsuranceService.mockResolvedValueOnce(false); // Simulate not found

//             const res = await request(app).delete(`/insurances/${insuranceId}`);

//             expect(res.statusCode).toEqual(404);
//             expect(res.body).toEqual({ message: 'Insurance not found' });
//             expect(mockedInsuranceService.deleteInsuranceService).toHaveBeenCalledTimes(1);
//         });

//         it('should return 500 if an unexpected error occurs during deletion', async () => {
//             const insuranceId = 1;
//             const error = new Error('Database error during deletion');
//             mockedInsuranceService.deleteInsuranceService.mockRejectedValueOnce(error);

//             const res = await request(app).delete(`/insurances/${insuranceId}`);

//             expect(res.statusCode).toEqual(500);
//             expect(res.body).toEqual({ message: "Error deleting insurance" });
           
         
//         });
//     });
