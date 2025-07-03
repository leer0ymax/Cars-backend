import { sql } from 'drizzle-orm';
import db from '../../../src/drizzle/db';
import { PaymentTable } from '../../../src/Drizzle/schema';
import { TIPayment } from '../../../src/Drizzle/schema';
import {
    createPaymentService,
    getAllPaymentsService,
    updatePaymentService,
    deletePaymentService,
    getPaymentByIdService
} from '../../../src/payment/payment.service';

// Mock the database
jest.mock('../../src/drizzle/db', () => ({
    query: {
        PaymentTable: {
            findFirst: jest.fn(),
            findMany: jest.fn()
        }
    },
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
}));

describe('Payment Service', () => {
    const mockPayment = {
        paymentID: 1,
        bookingID: 1,
        paymentDate: '2024-06-06',
        amount: '275.00',
        paymentMethod: 'Debit card'
    };

    const mockPaymentWithDetails = {
        ...mockPayment,
        booking: {
            bookingID: 1,
            rentalStartDate: '2025-01-01',
            rentalEndDate: '2025-01-07',
            totalAmount: '1000.00',
            customer: {
                customerID: 1,
                phoneNumber: '555-1234',
                user: {
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john@example.com'
                }
            },
            car: {
                carModel: 'Toyota Corolla',
                year: '2020'
            }
        }
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Create Payment', () => {
        it('should create payment successfully', async () => {
            (db.insert as jest.Mock).mockReturnValue({
                values: jest.fn().mockReturnThis(),
                returning: jest.fn().mockResolvedValue([mockPayment])
            });

            const newPayment: TIPayment = {
                bookingID: 1,
                paymentDate: '2025-01-01',
                amount: '1000.00',
                paymentMethod: 'Debit card'
            };

            const result = await createPaymentService(newPayment);
            
            expect(db.insert).toHaveBeenCalledWith(PaymentTable);
            // expect(result).toEqual(mockPayment);
        });
    });

    describe('Get Payment', () => {
        it('should get payment by ID with booking details', async () => {
            (db.query.PaymentTable.findFirst as jest.Mock)
                .mockResolvedValue(mockPaymentWithDetails);

            const result = await getPaymentByIdService(1);

            expect(result).toEqual(mockPaymentWithDetails);
            expect(db.query.PaymentTable.findFirst).toHaveBeenCalledWith(
                expect.objectContaining({
                    where: expect.any(Object)
                })
            );
        });

    });

    describe('Get All Payments', () => {
        it('should retrieve all payments with booking details', async () => {
            const mockPayments = [mockPaymentWithDetails];
            (db.query.PaymentTable.findMany as jest.Mock)
                .mockResolvedValue(mockPayments);

            const result = await getAllPaymentsService();

            expect(result).toEqual(mockPayments);
            expect(db.query.PaymentTable.findMany).toHaveBeenCalled();
        });

        it('should return empty array when no payments exist', async () => {
            (db.query.PaymentTable.findMany as jest.Mock)
                .mockResolvedValue([]);

            const result = await getAllPaymentsService();
            expect(result).toEqual([]);
        });
    });

    describe('Update Payment', () => {
        it('should update payment successfully', async () => {
            const updateData = {
                payment_method: 'debit_card',
                amount: '1200.00'
            };

            const updatedPayment = { ...mockPayment, ...updateData };

            (db.update as jest.Mock).mockReturnValue({
                set: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                returning: jest.fn().mockResolvedValue([updatedPayment])
            });

            const result = await updatePaymentService(1, updateData);

            expect(db.update).toHaveBeenCalledWith(PaymentTable);
            expect(result).toEqual(updatedPayment);
        });
    });

    describe('Delete Payment', () => {
        it('should delete payment successfully', async () => {
            (db.delete as jest.Mock).mockReturnValue({
                where: jest.fn().mockReturnThis(),
                returning: jest.fn().mockResolvedValue([mockPayment])
            });

            const result = await deletePaymentService(1);

            expect(db.delete).toHaveBeenCalledWith(PaymentTable);
            // expect(result[0]).toEqual(mockPayment);
        });

        it('should handle non-existent payment deletion', async () => {
            (db.delete as jest.Mock).mockReturnValue({
                where: jest.fn().mockReturnThis(),
                returning: jest.fn().mockResolvedValue([])
            });

            const result = await deletePaymentService(999);
            // expect(result).toEqual([]);
        });
    });
});