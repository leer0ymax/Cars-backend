import { sql } from 'drizzle-orm';
import db from '../../../src/Drizzle/db';
import { BookingsTable } from '../../../src/drizzle/schema';
import { 
    createBookingService,
    
    getAllBookingsService,
    updateBookingService,
    deleteBookingService,
    getBookingByIdService
} from '../../../src/booking/booking.service';

// Mock the database
jest.mock('../../src/drizzle/db', () => ({
    insert: jest.fn(),
    query: {
        BookingsTable: {
            findFirst: jest.fn(),
            findMany: jest.fn()
        }
    },
    update: jest.fn(),
    delete: jest.fn()
}));

describe('Booking Management', () => {
    const mockBooking = {
        bookingID: 1,
        customerID: 1,
        carID: 1,
        rentalStartDate: '2025-01-01',
        rentalEndDate: '2025-01-07',
        totalAmount: '700.00'
    };

    const mockBookingWithDetails = {
        ...mockBooking,
        customer: {
            customerID: 1,
            phonenumber: '1234567890',
            address: '123 Test St',
            user: {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com'
            }
        },
        car: {
            
            carModel: 'Camry',
            year: 2024,
            color: 'Blue',
            rentalRate: '100.00',
            availability: true,
            locationID: 1,

        }
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Create Booking', () => {
        describe('Valid Booking', () => {
            it('should create a new booking successfully', async () => {
                (db.insert as jest.Mock).mockReturnValue({
                    values: jest.fn().mockReturnThis(),
                    returning: jest.fn().mockResolvedValue([mockBooking])
                });

                const result = await createBookingService(mockBooking);
                expect(db.insert).toHaveBeenCalledWith(BookingsTable);
                // expect(result).toEqual(mockBooking);
            });
        });
 
        describe('Invalid Booking', () => {
            it('should handle database errors during creation', async () => {
                (db.insert as jest.Mock).mockReturnValue({
                    values: jest.fn().mockReturnThis(),
                    returning: jest.fn().mockRejectedValue(new Error('Database error'))
                });

                await expect(createBookingService(mockBooking))
                    .rejects
                    .toThrow('Database error');
            });
        });



    describe('Retrieve Booking', () => {
        describe('Single Booking', () => {
            it('should get booking by ID with full details', async () => {
                (db.query.BookingsTable.findFirst as jest.Mock)
                    .mockResolvedValue(mockBookingWithDetails);

                const result = await getBookingByIdService(1);
                expect(result).toEqual(mockBookingWithDetails);
            });

            it('should return null for non-existent booking', async () => {
                (db.query.BookingsTable.findFirst as jest.Mock)
                    .mockResolvedValue(null);

                const result = await getBookingByIdService(999);
                expect(result).toBeNull();
            });
        });

        describe('All Bookings', () => {
            it('should retrieve all bookings with details', async () => {
                const mockBookings = [mockBookingWithDetails];
                (db.query.BookingsTable.findMany as jest.Mock)
                    .mockResolvedValue(mockBookings);

                const result = await getAllBookingsService();
                expect(result).toEqual(mockBookings);
            });

            it('should return empty array when no bookings exist', async () => {
                (db.query.BookingsTable.findMany as jest.Mock)
                    .mockResolvedValue([]);

                const result = await getAllBookingsService();
                expect(result).toEqual([]);
            });
        });
    });

    describe('Update Booking', () => {
        const updateData = {
            rentalEndDate: '2025-01-10',
            totalAmount: '900.00'
        };

        describe('Valid Updates', () => {
            it('should update booking successfully', async () => {
                const updatedBooking = { ...mockBooking, ...updateData };
                (db.update as jest.Mock).mockReturnValue({
                    set: jest.fn().mockReturnThis(),
                    where: jest.fn().mockReturnThis(),
                    returning: jest.fn().mockResolvedValue([updatedBooking])
                });

                const result = await updateBookingService(1,updateData);
                expect(db.update).toHaveBeenCalledWith(BookingsTable);
                expect(result).toEqual(updatedBooking);
            });
        });

        describe('Invalid Updates', () => {
            it('should handle non-existent booking update', async () => {
                (db.update as jest.Mock).mockReturnValue({
                    set: jest.fn().mockReturnThis(),
                    where: jest.fn().mockReturnThis(),
                    returning: jest.fn().mockRejectedValue(new Error('Update failed'))
                });

                await expect(updateBookingService(1, updateData))
                    .rejects
                    .toThrow('Update failed');
            });
        });
    });

    describe('Delete Booking', () => {
        describe('Valid Deletion', () => {
            it('should delete booking successfully', async () => {
                (db.delete as jest.Mock).mockReturnValue({
                    where: jest.fn().mockReturnThis(),
                    returning: jest.fn().mockResolvedValue([mockBooking])
                });

                const result = await deleteBookingService(1);
                expect(db.delete).toHaveBeenCalledWith(BookingsTable);
                expect(result).toEqual(mockBooking);
            });
        });

        describe('Invalid Deletion', () => {
            it('should handle non-existent booking deletion', async () => {
                (db.delete as jest.Mock).mockReturnValue({
                    where: jest.fn().mockReturnThis(),
                    returning: jest.fn().mockRejectedValue(new Error('Delete failed'))
                });

                await expect(deleteBookingService(1))
                    .rejects
                    .toThrow('Delete failed');
            });
        });
    });
})
})
