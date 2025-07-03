// import request from 'supertest';
// import express, { Express } from 'express';
// import maintenanceRoutes from '../../../src/maintenance/maintenance.routes';
// import * as maintenanceService from '../../../src/maintenance/maintenance.service';
// import app from "../../../src/index"


// jest.mock('../../../src/maintenance/maintenance.service');

// const mockedMaintenanceService = maintenanceService as jest.Mocked<typeof maintenanceService>;

// beforeAll(() => {
  
// });

// beforeEach(() => {
//     jest.clearAllMocks();
// });

// describe('Maintenance API Endpoints', () => {

//     // Test for POST /maintenance
//     describe('POST /maintenances', () => {
//         it('should create a new maintenance and return 200 with the new maintenance', async () => {
//             const newMaintenanceData = {
//          maintenanceID: '1',       
//          carID: '1',
//          maintenanceDate: '2023-10-01',
//          description: 'Oil change',
//             cost: '50.00',

       
//             };
//             const createdMaintenance = { maintenanceID: 1, ...newMaintenanceData };
//             mockedMaintenanceService.createMaintenanceService.mockResolvedValueOnce(createdMaintenance);
           
           

//             const res = await request(app)
//                 .post('/maintenances')
//                 .send(newMaintenanceData);

//             // expect(res.statusCode).toEqual(201);
//             // expect(res.body).toEqual(createdMaintenance);
//             // expect(mockedMaintenanceService.createMaintenanceService).toHaveBeenCalledTimes(1);
//             // expect(mockedMaintenanceService.createMaintenanceService).toHaveBeenCalledWith(newMaintenanceData);
//         });

//     });

  
//     });

    
//     describe('GET /maintenances', () => {
//         it('should return all maintenances and a 200 status', async () => {
//             const ins = [
//                 { maintenanceID: 1,  carID: '1',maintenanceDate: '2020-02-02', description: 'oil change',cost:'50.00' },
//                 {  maintenanceID: 2,  carID: '2',maintenanceDate: '2020-03-03', description: 'coolant addition',cost:'300.00' },
//             ];

//             mockedMaintenanceService.getAllMaintenancesService.mockResolvedValueOnce(ins);

//             const res = await request(app).get('/maintenances');

//             expect(res.statusCode).toEqual(200);
           
//             expect(mockedMaintenanceService.getAllMaintenancesService).toHaveBeenCalledTimes(1);
//         });

//         it('should return 404 if no maintenances are found', async () => {
//             mockedMaintenanceService.getAllMaintenancesService.mockResolvedValueOnce([]); // Simulate no maintenances

//             const res = await request(app).get('/maintenances');

//             expect(res.statusCode).toEqual(404);
//             expect(res.body).toEqual({ message: 'No maintenances found' });
//             expect(mockedMaintenanceService.getAllMaintenancesService).toHaveBeenCalledTimes(1);
//         });

//         it('should return 500 if an unexpected error occurs during fetching all maintenances', async () => {
//             const error = new Error('Database timeout');
//             mockedMaintenanceService.getAllMaintenancesService.mockRejectedValueOnce(error);

//             const res = await request(app).get('/maintenances');

//             expect(res.statusCode).toEqual(500);
           
//         });
//     });

//     // Test for GET /maintenances/:id
//     describe('GET /maintenances/:id', () => {
//         it('should return a single maintenance by ID and a 200 status', async () => {
//             const maintenanceId = 1;
//             const maintenance = { maintenanceID: maintenanceId,  carID: '4', maintenanceDate: '2020-03-03', description: 'oil change',cost:'300' };

//             mockedMaintenanceService.getMaintenanceByIdService.mockResolvedValueOnce(maintenance);

//             const res = await request(app).get(`/maintenances/${maintenanceId}`);

//             expect(res.statusCode).toEqual(200);
//             expect(res.body).toEqual({ Maintenance: maintenance }); // Note the 'maintenance' key from your controller
//             expect(mockedMaintenanceService.getMaintenanceByIdService).toHaveBeenCalledTimes(1);
//             expect(mockedMaintenanceService.getMaintenanceByIdService).toHaveBeenCalledWith(maintenanceId);
//         });

//         it('should return 404 if the maintenance ID is not found', async () => {
//             const maintenanceId = 999;
//             mockedMaintenanceService.getMaintenanceByIdService.mockResolvedValueOnce(null); // Simulate not found

//             const res = await request(app).get(`/maintenances/${maintenanceId}`);

//             expect(res.statusCode).toEqual(404);
//             expect(res.body).toEqual({ message: 'no maintenance' });
//             expect(mockedMaintenanceService.getMaintenanceByIdService).toHaveBeenCalledTimes(1);
//         });

//         it('should return 500 if an unexpected error occurs during fetching by ID', async () => {
//             const maintenanceId = 1;
//             const error = new Error('Network error');
//             mockedMaintenanceService.getMaintenanceByIdService.mockRejectedValueOnce(error);

//             const res = await request(app).get(`/maintenances/${maintenanceId}`);

//             expect(res.statusCode).toEqual(500);
//             expect(res.body).toEqual({ message: 'server error' });
//             expect(mockedMaintenanceService.getMaintenanceByIdService).toHaveBeenCalledTimes(1);
//         });
//     });

//     // Test for PUT /maintenances/:id
//     describe('PUT /maintenances/:id', () => {
//         it('should update a maintenance and return 200 with the updated maintenance', async () => {
//             const maintenanceId = 1;
//             const updateData = { carID: '4' };
//             const updatedMaintenance = {maintenanceID: maintenanceId, carID: ' 4', maintenanceDate: '2020-03-03', description: 'oil change', cost:'50.00' };

//             mockedMaintenanceService.updateMaintenanceService.mockResolvedValueOnce(updatedMaintenance);

//             const res = await request(app)
//                 .put(`/maintenances/${maintenanceId}`)
//                 .send(updateData);

//             expect(res.statusCode).toEqual(200);
//             expect(res.body).toEqual(updatedMaintenance);
//             expect(mockedMaintenanceService.updateMaintenanceService).toHaveBeenCalledTimes(1);
//             expect(mockedMaintenanceService.updateMaintenanceService).toHaveBeenCalledWith(maintenanceId, updateData);
//         });

//         it('should return 404 if the maintenance to update is not found', async () => {
//             const maintenanceId = 999;
//             const updateData = { carID: '4' };
//             mockedMaintenanceService.updateMaintenanceService.mockResolvedValueOnce(null); // Simulate not found

//             const res = await request(app)
//                 .put(`/maintenances/${maintenanceId}`)
//                 .send(updateData);

//             expect(res.statusCode).toEqual(404);
//             expect(res.body).toEqual({ message: 'Maintenance not found' });
//             expect(mockedMaintenanceService.updateMaintenanceService).toHaveBeenCalledTimes(1);
//         });

//     });

//     // Test for DELETE /maintenances/:id
//     describe('DELETE /maintenances/:id', () => {
//         it('should delete a maintenance and return 200 success message', async () => {
//             const maintenanceId = 1;
//             mockedMaintenanceService.deleteMaintenanceService.mockResolvedValueOnce(true); // Simulate successful deletion

//             const res = await request(app).delete(`/maintenances/${maintenanceId}`);

//             // expect(res.statusCode).toEqual(200);
//             // expect(res.body).toEqual({ message: 'Maintenance deleted successfully' });
//             // expect(mockedMaintenanceService.deleteMaintenanceService).toHaveBeenCalledTimes(1);
//             // expect(mockedMaintenanceService.deleteMaintenanceService).toHaveBeenCalledWith(insuranceId);
//         });

//         it('should return 404 if the maintenance to delete is not found', async () => {
//             const maintenanceId = 999;
//             mockedMaintenanceService.deleteMaintenanceService.mockResolvedValueOnce(false); // Simulate not found

//             const res = await request(app).delete(`/maintenances/${maintenanceId}`);

//             expect(res.statusCode).toEqual(404);
//             expect(res.body).toEqual({ message: 'Maintenance not found' });
//             expect(mockedMaintenanceService.deleteMaintenanceService).toHaveBeenCalledTimes(1);
//         });

//         it('should return 500 if an unexpected error occurs during deletion', async () => {
//             const maintenanceId = 1;
//             const error = new Error('Database error during deletion');
//             mockedMaintenanceService.deleteMaintenanceService.mockRejectedValueOnce(error);

//             const res = await request(app).delete(`/maintenances/${maintenanceId}`);

//             // expect(res.statusCode).toEqual(500);
//             // expect(res.body).toEqual({ message: "Error deleting maintenance" });
           
         
//         });
//     });