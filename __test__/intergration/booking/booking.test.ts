// import request from 'supertest';
// import app  from '../../../src/index';
// import { createTestUtils } from '../utils';
// import { CarTable, LocationTable } from '../../../src/Drizzle/schema';
// import db from '../../../src/Drizzle/db';

// let locationID: number;



// describe('Booking Integration Tests', () => {
//   let bookingID: number;
//   let carID: number;
//   let customerID: number;
//   let rentalStartDate: string;
//   let rentalEndDate: string;
//   let totalAmount: string;
//   let adminToken: string;
//   let userToken: string;
//   let userID: number;
 

//   const adminTestUtils = createTestUtils({
//     firstName: 'Admin',
//     lastName: 'User',
//     email: `admin${Date.now()}@test.com`,
//     password: 'Admin123!',
//     role: 'admin'
//   });

//   const userTestUtils = createTestUtils({
//     firstName: 'Regular',
//     lastName: 'User',
//     email: `user${Date.now()}@test.com`,
//     password: 'User123!',
//     role: 'customer'
//   });

//   beforeAll(async () => {
//     try {
//       // Create and verify test users
//       await adminTestUtils.createTestUser({ role: 'admin', isVerified: true });
//       const regularUser = await userTestUtils.createTestUser({
//         role: 'customer',
//         isVerified: true,
//         skipCustomerCreation: true
//       });
//       userID = regularUser.id;

//       // Get auth tokens
//       adminToken = await adminTestUtils.getAuthToken(app);
//       userToken = await userTestUtils.getAuthToken(app);

//       // Create test location
//       const [location] = await db.insert(LocationTable).values({
//         locationName: 'Test Location',
//         address: 'Test Address',
//         contactNumber: '1234567890'
//       }).returning();
//       locationID = location.locationID;
      
     
    

//       // Create test car
//       const [car] = await db.insert(CarTable).values({
//         carModel: 'Toyota Corolla',
//         year: '2025-01-01',
//         color: 'Black',
//         rentalRate: "100.00",
//         availability: true,
//         locationID: 1
//       }).returning();
//       carID = car.carID;


     


//       // Create customer profile
//       const customerResponse = await request(app)
//         .post('/customers')
//         .set('Authorization', `Bearer ${userToken}`)
//         .send({
         
//           userID: userID,
//           phoneNumber: '1234567890',
//           address: '123 Test St'
//         });

//       if (customerResponse.status !== 201) {
//         throw new Error(`Failed to create customer: ${JSON.stringify(customerResponse.body)}`);
//       }
      
//       customerID = customerResponse.body.customer.customerID;
//     } catch (error) {
//       console.error('Test setup failed:', error);
//       throw error;
//     }
//   });

//   afterAll(async () => {
//     try {
//       await adminTestUtils.cleanup();
//       await userTestUtils.cleanup();
//     } catch (error) {
//       console.error('Test cleanup failed:', error);
//     }
//   });

//   describe('POST /bookings', () => {
//     it('should create a new booking', async () => {
//       const bookingData = {
//         customerID: customerID,
//         carID: carID,
//         rentalStartDate: '2025-06-15',
//         rentalEndDate: '2025-06-20',
//         totalAmount: "500.00",
       
       
//       };

//       const response = await request(app)
//         .post('/bookings')
//         .set('Authorization', `Bearer ${userToken}`)
//         .send(bookingData);

//       expect(response.status).toBe(201);
//       expect(response.body.message).toBe('Booking created successfully');
//       expect(response.body).toHaveProperty('booking');
//       expect(response.body.booking.customer_id).toBe(bookingData.customer_id);
//       expect(response.body.booking.car_id).toBe(bookingData.car_id);
//       bookingID = response.body.booking.booking_id;
//     });

//     it('should not create booking with invalid data', async () => {
//       const invalidData = {
//         customerID: customerID
//         // Missing required fields
//       };

//       const response = await request(app)
//         .post('/bookings')
//         .set('Authorization', `Bearer ${userToken}`)
//         .send(invalidData);

//       expect(response.status).toBe(400);
//       expect(response.body.message).toBe('Invalid booking data');
//     });

//     it('should not create booking for unavailable car', async () => {
//       // First, update car to unavailable
//       await request(app)
//         .put(`/cars/${carID}`)
//         .set('Authorization', `Bearer ${adminToken}`)
//         .send({ availability: false });

//       const bookingData = {
//         customerID: customerID,
//         carID: carID,
//         rentalStartDate: '2025-06-15',
//         rentalEndDate: '2025-06-20',
//         totalAmount: "500.00"
//       };

//       const response = await request(app)
//         .post('/bookings')
//         .set('Authorization', `Bearer ${userToken}`)
//         .send(bookingData);

//       expect(response.status).toBe(400);
//       expect(response.body.message).toBe('Car is not available for booking');

//       // Reset car availability
//       await request(app)
//         .put(`/cars/${carID}`)
//         .set('Authorization', `Bearer ${adminToken}`)
//         .send({ availability: true });
//     });
//   });

//   describe('GET /bookings/:id', () => {
//     it('should retrieve a booking by ID', async () => {
//       const response = await request(app)
//         .get(`/bookings/${bookingID}`)
//         .set('Authorization', `Bearer ${userToken}`);

//       expect(response.status).toBe(200);
//       expect(response.body).toHaveProperty('booking');
//       expect(response.body.booking.bookingID).toBe(bookingID);
//       expect(response.body.booking.customerID).toBe(customerID);
//     });

//     it('should return 404 for non-existent booking', async () => {
//       const response = await request(app)
//         .get('/bookings/9999')
//         .set('Authorization', `Bearer ${userToken}`);

//       expect(response.status).toBe(404);
//       expect(response.body.message).toBe('Booking not found');
//     });
//   });

//   describe('GET /bookings', () => {
//     it('should allow admin to get all bookings', async () => {
//       const response = await request(app)
//         .get('/bookings')
//         .set('Authorization', `Bearer ${adminToken}`);

//       expect(response.status).toBe(200);
//       expect(Array.isArray(response.body.bookings)).toBe(true);
//       expect(response.body.bookings.length).toBeGreaterThan(0);
//     });

//     it('should allow customer to get their own bookings', async () => {
//       const response = await request(app)
//         .get('/bookings')
//         .set('Authorization', `Bearer ${userToken}`);

//       expect(response.status).toBe(200);
//       expect(Array.isArray(response.body.bookings)).toBe(true);
//       expect(response.body.bookings.every((booking: { customerID: number }) => 
//         booking.customerID === customerID
//       )).toBe(true);
//     });
//   });

//   describe('PUT /bookings/:id', () => {
//     it('should update a booking', async () => {
//       const updatedData = {
//         rentalEndDate: '2025-06-22',
//         totalAmount: "600.00"
//       };

//       const response = await request(app)
//         .put(`/bookings/${bookingID}`)
//         .set('Authorization', `Bearer ${userToken}`)
//         .send(updatedData);

//       expect(response.status).toBe(200);
//       expect(response.body.message).toBe('Booking updated successfully');
//       expect(response.body.booking.rentalEndDate).toBe(updatedData.rentalEndDate);
//       expect(response.body.booking.totalAmount).toBe(updatedData.totalAmount);
//     });

    

//     it('should not allow updating another customer\'s booking', async () => {
//       // Create another user
//       const otherUser = createTestUtils({
//         firstName: 'Other',
//         lastName: 'User',
//         email: `other${Date.now()}@test.com`,
//         password: 'Other123!',
//         role: 'customer'
//       });

//       const otherUserData = await otherUser.createTestUser({ role: 'customer', isVerified: true });
//       const otherToken = await otherUser.getAuthToken(app);

//       const response = await request(app)
//         .put(`/bookings/${bookingID}`)
//         .set('Authorization', `Bearer ${otherToken}`)
//         .send({ rentalEndDate: '2025-06-24' });

//       expect(response.status).toBe(403);
//       expect(response.body.message).toContain('Access denied');

//       // Cleanup other user
//       await otherUser.cleanup();
//     });
//   });

//   describe('DELETE /bookings/:id', () => {
//     it('should not allow customer to delete booking', async () => {
//       const response = await request(app)
//         .delete(`/bookings/${bookingID}`)
//         .set('Authorization', `Bearer ${userToken}`);

//       expect(response.status).toBe(403);
//       expect(response.body.message).toContain('Access denied');
//     });

//     it('should allow admin to delete booking', async () => {
//       const response = await request(app)
//         .delete(`/bookings/${bookingID}`)
//         .set('Authorization', `Bearer ${adminToken}`);

//       expect(response.status).toBe(200);
//       expect(response.body.message).toBe('Booking deleted successfully');
//     });
//   });
// });