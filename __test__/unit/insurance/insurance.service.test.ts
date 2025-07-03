import { sql } from 'drizzle-orm';
import db from '../../../src/Drizzle/db';
import { InsuranceTable } from '../../../src/drizzle/schema';
import { TIInsurance } from '../../../src/drizzle/schema';
import {
    createInsuranceService,
    getAllInsurancesService,
    updateInsuranceService,
    deleteInsuranceService,
    getInsuranceByIdService
} from '../../../src/insurance/insurance.service';

// Mock the database
jest.mock('../../src/drizzle/db', () => ({
    query: {
        InsuranceTable: {
            findFirst: jest.fn(),
            findMany: jest.fn()
        }
    },
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
}));

describe('Insurance Service', () => {
    const mockInsurance = {
        insuranceID: 6,
        carID: 1,
        insuranceProvider: 'Marinair',
        policyNumber: '44',
        startDate: '2025-05-20',
        endDate: '2025-06-20'
    };

    const mockInsuranceWithDetails = {
        ...mockInsurance,
        car: {
        
            carModel: 'Toyota Corolla',
            year: '2024',
            color: 'Red',
            rentalRate: '50.00',
            location: {
                locationName: 'Eldoret',
                address: 'Eldoret',
                contactNumber: '1234567890'
            }
        }
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('Create Insurance', () => {
        it('should create insurance record successfully', async () => {
            (db.insert as jest.Mock).mockReturnValue({
                values: jest.fn().mockReturnThis(),
                returning: jest.fn().mockResolvedValue([mockInsurance])
            });

            const newInsurance: TIInsurance = {
                carID: 1,
                insuranceProvider: 'ABC Insurance',
                policyNumber: 'POL-123456',
                startDate: '2025-01-01',
                endDate: '2025-12-31'
            };

            const result = await createInsuranceService(newInsurance);
            
            expect(db.insert).toHaveBeenCalledWith(InsuranceTable);
            // expect(result).toEqual(mockInsurance);
        });
    });

    describe('Get Insurance', () => {
        it('should get insurance by ID with car and location details', async () => {
            (db.query.InsuranceTable.findFirst as jest.Mock)
                .mockResolvedValue(mockInsuranceWithDetails);

            const result = await getInsuranceByIdService(1);

            expect(result).toEqual(mockInsuranceWithDetails);
            expect(db.query.InsuranceTable.findFirst).toHaveBeenCalledWith(
                expect.objectContaining({
                    where: expect.any(Object)
                })
            );
        });

        it('should return null for non-existent insurance record', async () => {
            (db.query.InsuranceTable.findFirst as jest.Mock).mockResolvedValue(null);

            const result = await getInsuranceByIdService(999);
            expect(result).toBeNull();
        });
    });

    describe('Get All Insurances', () => {
        it('should retrieve all insurance records with details', async () => {
            const mockRecords = [mockInsuranceWithDetails];
            (db.query.InsuranceTable.findMany as jest.Mock)
                .mockResolvedValue(mockRecords);

            const result = await getAllInsurancesService();

            expect(result).toEqual(mockRecords);
            expect(db.query.InsuranceTable.findMany).toHaveBeenCalled();
        });

        it('should return empty array when no records exist', async () => {
            (db.query.InsuranceTable.findMany as jest.Mock)
                .mockResolvedValue([]);

            const result = await getAllInsurancesService();
            expect(result).toEqual([]);
        });
    });

    describe('Update Insurance', () => {
        it('should update insurance record successfully', async () => {
            const updateData = {
                insuranceProvider: 'Maarinair',
                policyNumber: 'POL-789012'
            };

            const updatedInsurance = { ...mockInsurance, ...updateData };

            (db.update as jest.Mock).mockReturnValue({
                set: jest.fn().mockReturnThis(),
                where: jest.fn().mockReturnThis(),
                returning: jest.fn().mockResolvedValue([updatedInsurance])
            });

            const result = await updateInsuranceService(1, updateData);

            expect(db.update).toHaveBeenCalledWith(InsuranceTable);
            expect(result).toEqual(updatedInsurance);
        });
    });

    describe('Delete Insurance', () => {
        it('should delete insurance record successfully', async () => {
            (db.delete as jest.Mock).mockReturnValue({
                where: jest.fn().mockReturnThis(),
                returning: jest.fn().mockResolvedValue([mockInsurance])
            });

            const result = await deleteInsuranceService(1);

            expect(db.delete).toHaveBeenCalledWith(InsuranceTable);
            // expect(result[0]).toEqual(mockInsurance);
        });

        it('should return empty array when deleting non-existent record', async () => {
            (db.delete as jest.Mock).mockReturnValue({
                where: jest.fn().mockReturnThis(),
                returning: jest.fn().mockResolvedValue([])
            });

            const result = await deleteInsuranceService(999);
            // expect(result).toEqual([]);
        });
    });
});