// import request from 'supertest';
// import express, { Express } from 'express';
// import locationRoutes from '../../../src/location/location.routes';
// import * as locationService from '../../../src/location/location.service';
// import app from "../../../src/index"


// jest.mock('../../../src/location/location.service');

// const mockedLocationService = locationService as jest.Mocked<typeof locationService>;

// beforeAll(() => {
  
// });

// beforeEach(() => {
//     jest.clearAllMocks();
// });

// describe('Location API Endpoints', () => {

//     // Test for POST /location
//     describe('POST /locations', () => {
//         it('should create a new location and return 200 with the new location', async () => {
//             const newLocationData = {
//          carID: '1',
//          insuranceProvider: 'Marinair',
//          policyNumber: '3546',
//          startDate: '2020-02-02',
//          endDate: ' 2020-03-03',

       
//             };
//             const createdLocation = { locationID: 1, ...newLocationData };
//             mockedLocationService.createLocationService.mockResolvedValueOnce(createdLocation);
           
           

//             const res = await request(app)
//                 .post('/locations')
//                 .send(newLocationData);

//             // expect(res.statusCode).toEqual(201);
//             // expect(res.body).toEqual(createdLocation);
//             // expect(mockedLocationService.createLocationService).toHaveBeenCalledTimes(1);
//             // expect(mockedLocationService.createLocationService).toHaveBeenCalledWith(newLocationData);
//         });

//     });

  
//     });

    
//     describe('GET /locations', () => {
//         it('should return all locations and a 200 status', async () => {
//             const ins = [
//                 { locationID: 1, locationName: 'Eldoret',address: 'Eldoret', contactNumber: '0987654321' },
//                 {   locationID: 1, locationName: 'Nakuru',address: '789 Nakuru', contactNumber: '5555555555' },
//             ];

//             mockedLocationService.getAllLocationsService.mockResolvedValueOnce(ins);

//             const res = await request(app).get('/locations');

//             expect(res.statusCode).toEqual(200);
           
//             expect(mockedLocationService.getAllLocationsService).toHaveBeenCalledTimes(1);
//         });

//         it('should return 404 if no locations are found', async () => {
//             mockedLocationService.getAllLocationsService.mockResolvedValueOnce([]); // Simulate no locations

//             const res = await request(app).get('/locations');

//             expect(res.statusCode).toEqual(404);
//             expect(res.body).toEqual({ message: 'No locations found' });
//             expect(mockedLocationService.getAllLocationsService).toHaveBeenCalledTimes(1);
//         });

//         it('should return 500 if an unexpected error occurs during fetching all locations', async () => {
//             const error = new Error('Database timeout');
//             mockedLocationService.getAllLocationsService.mockRejectedValueOnce(error);

//             const res = await request(app).get('/locations');

//             expect(res.statusCode).toEqual(500);
           
//         });
//     });

//     // Test for GET /locations/:id
//     describe('GET /locations/:id', () => {
//         it('should return a single location by ID and a 200 status', async () => {
//             const locationId = 1;
//             const location = { locationID: locationId,  locationName: 'Nyeri', address: 'B16', contactNumber: '0707805913' };

//             mockedLocationService.getLocationByIdService.mockResolvedValueOnce(location);

//             const res = await request(app).get(`/locations/${locationId}`);

//             expect(res.statusCode).toEqual(200);
//             expect(res.body).toEqual({ Location: location }); // Note the 'location' key from your controller
//             expect(mockedLocationService.getLocationByIdService).toHaveBeenCalledTimes(1);
//             expect(mockedLocationService.getLocationByIdService).toHaveBeenCalledWith(locationId);
//         });

//         it('should return 404 if the location ID is not found', async () => {
//             const locationId = 999;
//             mockedLocationService.getLocationByIdService.mockResolvedValueOnce(null); // Simulate not found

//             const res = await request(app).get(`/locations/${locationId}`);

//             expect(res.statusCode).toEqual(404);
//             expect(res.body).toEqual({ message: 'no location' });
//             expect(mockedLocationService.getLocationByIdService).toHaveBeenCalledTimes(1);
//         });

//         it('should return 500 if an unexpected error occurs during fetching by ID', async () => {
//             const locationId = 1;
//             const error = new Error('Network error');
//             mockedLocationService.getLocationByIdService.mockRejectedValueOnce(error);

//             const res = await request(app).get(`/locations/${locationId}`);

//             expect(res.statusCode).toEqual(500);
//             expect(res.body).toEqual({ message: 'server error' });
//             expect(mockedLocationService.getLocationByIdService).toHaveBeenCalledTimes(1);
//         });
//     });

//     // Test for PUT /locations/:id
//     describe('PUT /locations/:id', () => {
//         it('should update a location and return 200 with the updated location', async () => {
//             const locationId = 1;
//             const updateData = { address: 'B12' };
//             const updatedLocation = {locationID: locationId, locationName: ' Nyeri', address: 'B16', contactNumber: '0707805913' };

//             mockedLocationService.updateLocationService.mockResolvedValueOnce(updatedLocation);

//             const res = await request(app)
//                 .put(`/locations/${locationId}`)
//                 .send(updateData);

//             expect(res.statusCode).toEqual(200);
//             expect(res.body).toEqual(updatedLocation);
//             expect(mockedLocationService.updateLocationService).toHaveBeenCalledTimes(1);
//             expect(mockedLocationService.updateLocationService).toHaveBeenCalledWith(locationId, updateData);
//         });

//         it('should return 404 if the location to update is not found', async () => {
//             const locationId = 999;
//             const updateData = { address: 'B16' };
//             mockedLocationService.updateLocationService.mockResolvedValueOnce(null); // Simulate not found

//             const res = await request(app)
//                 .put(`/locations/${locationId}`)
//                 .send(updateData);

//             expect(res.statusCode).toEqual(404);
//             expect(res.body).toEqual({ message: 'Location not found' });
//             expect(mockedLocationService.updateLocationService).toHaveBeenCalledTimes(1);
//         });

//     });

//     // Test for DELETE /locations/:id
//     describe('DELETE /locations/:id', () => {
//         it('should delete a location and return 200 success message', async () => {
//             const locationId = 1;
//             mockedLocationService.deleteLocationService.mockResolvedValueOnce(true); // Simulate successful deletion

//             const res = await request(app).delete(`/locations/${locationId}`);

//             // expect(res.statusCode).toEqual(200);
//             // expect(res.body).toEqual({ message: 'Location deleted successfully' });
//             // expect(mockedLocationService.deleteLocationService).toHaveBeenCalledTimes(1);
//             // expect(mockedLocationService.deleteLocationService).toHaveBeenCalledWith(insuranceId);
//         });

//         it('should return 404 if the location to delete is not found', async () => {
//             const locationId = 999;
//             mockedLocationService.deleteLocationService.mockResolvedValueOnce(false); // Simulate not found

//             const res = await request(app).delete(`/locations/${locationId}`);

//             expect(res.statusCode).toEqual(404);
//             expect(res.body).toEqual({ message: 'Location not found' });
//             expect(mockedLocationService.deleteLocationService).toHaveBeenCalledTimes(1);
//         });

//         it('should return 500 if an unexpected error occurs during deletion', async () => {
//             const locationId = 1;
//             const error = new Error('Database error during deletion');
//             mockedLocationService.deleteLocationService.mockRejectedValueOnce(error);

//             const res = await request(app).delete(`/locations/${locationId}`);

//             // expect(res.statusCode).toEqual(500);
//             // expect(res.body).toEqual({ message: "Error deleting location" });
           
         
//         });
//     });