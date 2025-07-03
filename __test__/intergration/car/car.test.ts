// import request from 'supertest';
// import express, { Express } from 'express';
// import carRoutes from '../../../src/car/car.routes';
// import * as carService from '../../../src/car/car.service';
// import app from "../../../src/index"


// jest.mock('../../../src/car/car.service');

// const mockedCarService = carService as jest.Mocked<typeof carService>;

// beforeAll(() => {
  
// });

// beforeEach(() => {
//     jest.clearAllMocks();
// });

// describe('Car API Endpoints', () => {

//     // Test for POST /car
//     describe('POST /cars', () => {
//         it('should create a new booking and return 200 with the new booking', async () => {
//             const newCarData = {
//                 carModel: 'Toyota Corolla',
//         year: '2024',
//         color: 'Blue',
//         availability: true,
//         rentalRate: '100.00',
//         locationID:1
//             };
//             const createdCar = { carID: 1, ...newCarData };

//             mockedCarService.createCarService.mockResolvedValueOnce(createdCar);

//             const res = await request(app)
//                 .post('/cars')
//                 .send(newCarData);

//             expect(res.statusCode).toEqual(200);
//             expect(res.body).toEqual({ message: 'successfully created', newCar: createdCar });
//             expect(mockedCarService.createCarService).toHaveBeenCalledTimes(1);
//             expect(mockedCarService.createCarService).toHaveBeenCalledWith(newCarData);
//         });

//         it('should return 404 if car creation fails', async () => {
//             const newCarData = {
//                 carModel: 'Toyota Corolla',
//                 year: '2024',
//                 color: 'Blue',
//                 availability: true,
//                 rentalRate: '100.00'
//             };

//             mockedCarService.createCarService.mockResolvedValueOnce(null); // Simulate creation failure

//             const res = await request(app)
//                 .post('/cars')
//                 .send(newCarData);

//             expect(res.statusCode).toEqual(404);
//             expect(res.body).toEqual({ message: 'error creating cars' });
//             expect(mockedCarService.createCarService).toHaveBeenCalledTimes(1);
//         });

//         it('should return 500 if an unexpected error occurs during creation', async () => {
//             const newCarData = {
//                 carModel: 'Toyota Corolla',
//         year: '2024',
//         color: 'Blue',
//         availability: true,
//         rentalRate: '100.00',
//         locationID:1
//             };
//             const error = new Error('Database connection failed');
//             mockedCarService.createCarService.mockRejectedValueOnce(error);

//             const res = await request(app)
//                 .post('/cars')
//                 .send(newCarData);

//             expect(res.statusCode).toEqual(500);
//             expect(res.body).toEqual({ message: 'Error fetching cars', error: expect.any(Object) }); // Error object can vary
//             expect(mockedCarService.createCarService).toHaveBeenCalledTimes(1);
//         });
//     });

//     // Test for GET /cars
//     describe('GET /cars', () => {
//         it('should return all cars and a 200 status', async () => {
//             const cars = [
//                 {  carID: 1, carModel: 'Toyota Corolla', year: '2020-01-01', color: 'Red', rentalRate: '50.00',availability:'true',locationID:1 },
//                 {  carID: 2, carModel: 'Honda Civic', year: '2019-06-01', color: 'Blue', rentalRate: '55.00',availability:'true',locationID:2 }
//             ];

//             mockedCarService.getAllCarsService.mockResolvedValueOnce(cars);

//             const res = await request(app).get('/cars');

//             expect(res.statusCode).toEqual(200);
//             expect(res.body).toEqual(cars);
//             expect(mockedCarService.getAllCarsService).toHaveBeenCalledTimes(1);
//         });

//         it('should return 404 if no cars are found', async () => {
//             mockedCarService.getAllCarsService.mockResolvedValueOnce([]); // Simulate no bookings

//             const res = await request(app).get('/cars');

//             expect(res.statusCode).toEqual(404);
//             expect(res.body).toEqual({ message: 'No cars found' });
//             expect(mockedCarService.getAllCarsService).toHaveBeenCalledTimes(1);
//         });

//         it('should return 500 if an unexpected error occurs during fetching all cars', async () => {
//             const error = new Error('Database timeout');
//             mockedCarService.getAllCarsService.mockRejectedValueOnce(error);

//             const res = await request(app).get('/cars');

//             expect(res.statusCode).toEqual(500);
//             expect(res.body).toEqual({ message: 'Error fetching cars', error: expect.any(Object) });
//             expect(mockedCarService.getAllCarsService).toHaveBeenCalledTimes(1);
//         });
//     });

//     // Test for GET /cars/:id
//     describe('GET /cars/:id', () => {
//         it('should return a single car by ID and a 200 status', async () => {
//             const carId = 1;
//             const car = { bookingID: carId, carID: 1, customerID: 101, rentalStartDate: '2025-07-01', rentalEndDate: '2025-07-07', totalAmount: '150.00' };

//             mockedCarService.getCarByIdService.mockResolvedValueOnce(car);

//             const res = await request(app).get(`/cars/${carId}`);

//             expect(res.statusCode).toEqual(200);
//             expect(res.body).toEqual({ Car: car }); // Note the 'Car' key from your controller
//             expect(mockedCarService.getCarByIdService).toHaveBeenCalledTimes(1);
//             expect(mockedCarService.getCarByIdService).toHaveBeenCalledWith(carId);
//         });

//         it('should return 404 if the car ID is not found', async () => {
//             const carId = 999;
//             mockedCarService.getCarByIdService.mockResolvedValueOnce(null); // Simulate not found

//             const res = await request(app).get(`/cars/${carId}`);

//             expect(res.statusCode).toEqual(404);
//             expect(res.body).toEqual({ message: 'no car' });
//             expect(mockedCarService.getCarByIdService).toHaveBeenCalledTimes(1);
//         });

//         it('should return 500 if an unexpected error occurs during fetching by ID', async () => {
//             const carId = 1;
//             const error = new Error('Network error');
//             mockedCarService.getCarByIdService.mockRejectedValueOnce(error);

//             const res = await request(app).get(`/cars/${carId}`);

//             expect(res.statusCode).toEqual(500);
//             expect(res.body).toEqual({ message: 'server error' });
//             expect(mockedCarService.getCarByIdService).toHaveBeenCalledTimes(1);
//         });
//     });

//     // Test for PUT /cars/:id
//     describe('PUT /cars/:id', () => {
//         it('should update a car and return 200 with the updated booking', async () => {
//             const carId = 1;
//             const updateData = { year: '2025-06-17', color: 'Gray' };
//             const updatedCar = { carID: carId, carModel: 'Toyota Corolla', year: '2020-01-01', color: 'Red', rentalRate: '50.00', locationID: 'null' };

//             mockedCarService.updateCarService.mockResolvedValueOnce(updatedCar);

//             const res = await request(app)
//                 .put(`/cars/${carId}`)
//                 .send(updateData);

//             expect(res.statusCode).toEqual(200);
//             expect(res.body).toEqual(updatedCar);
//             expect(mockedCarService.updateCarService).toHaveBeenCalledTimes(1);
//             expect(mockedCarService.updateCarService).toHaveBeenCalledWith(carId, updateData);
//         });

//         it('should return 404 if the car to update is not found', async () => {
//             const carId = 999;
//             const updateData = { color: 'Gray' };
//             mockedCarService.updateCarService.mockResolvedValueOnce(null); // Simulate not found

//             const res = await request(app)
//                 .put(`/cars/${carId}`)
//                 .send(updateData);

//             expect(res.statusCode).toEqual(404);
//             expect(res.body).toEqual({ message: 'Car not found' });
//             expect(mockedCarService.updateCarService).toHaveBeenCalledTimes(1);
//         });

//     });

//     // Test for DELETE /bookings/:id
//     describe('DELETE /cars/:id', () => {
//         it('should delete a car and return 200 success message', async () => {
//             const carId = 1;
//             mockedCarService.deleteCarService.mockResolvedValueOnce(true); // Simulate successful deletion

//             const res = await request(app).delete(`/cars/${carId}`);

//             expect(res.statusCode).toEqual(200);
//             expect(res.body).toEqual({ message: 'Car deleted successfully' });
//             expect(mockedCarService.deleteCarService).toHaveBeenCalledTimes(1);
//             expect(mockedCarService.deleteCarService).toHaveBeenCalledWith(carId);
//         });

//         it('should return 404 if the car to delete is not found', async () => {
//             const carId = 999;
//             mockedCarService.deleteCarService.mockResolvedValueOnce(false); // Simulate not found

//             const res = await request(app).delete(`/cars/${carId}`);

//             expect(res.statusCode).toEqual(404);
//             expect(res.body).toEqual({ message: 'Car not found' });
//             expect(mockedCarService.deleteCarService).toHaveBeenCalledTimes(1);
//         });

//         it('should return 500 if an unexpected error occurs during deletion', async () => {
//             const carId = 1;
//             const error = new Error('Database error during deletion');
//             mockedCarService.deleteCarService.mockRejectedValueOnce(error);

//             const res = await request(app).delete(`/cars/${carId}`);

//             expect(res.statusCode).toEqual(500);
//             expect(res.body).toEqual({ message: 'server error' });
//             expect(mockedCarService.deleteCarService).toHaveBeenCalledTimes(1);
//         });
//     });
// });