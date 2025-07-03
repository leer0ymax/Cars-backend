import request from 'supertest';
import bcrypt from 'bcryptjs';
import { eq } from 'drizzle-orm';
import db, { client } from '../../src/Drizzle/db';
import { CustomerTable, UsersTable } from '../../src/Drizzle/schema';


// Types for test data
interface TestUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
  phoneNumber?: string;
  address?: string;
    isVerified?: boolean;
    verificationCode?: string;
}

interface TestUserOptions {
  role?: string;
  isVerified?: boolean;
  skipCustomerCreation?: boolean;
}

// Default test user data
const defaultTestUser: TestUser = {
  firstName: "Test",
  lastName: "User",
  email: "testuser@mail.com",
  password: "testpass123",
  role: "customer",
  phoneNumber: "1234567890",
  address: "123 Test St"
};

/**
 * Create a test utils instance with custom user data
 */
export const createTestUtils = (customUser?: Partial<TestUser>) => {
  const testUser: TestUser = { ...defaultTestUser, ...customUser };

  return {
    /**
     * Get test user credentials (for login)
     */
    getCredentials: () => ({
      email: testUser.email,
      password: testUser.password
    }),

    /**
     * Get full registration data including customer fields
     */
    getRegistrationData: () => ({
      firstName: testUser.firstName,
      lastName: testUser.lastName,
      email: testUser.email,
      password: testUser.password,
      role: testUser.role,
      phoneNumber: testUser.phoneNumber,
      address: testUser.address
    }),

    /**
     * Clean up test user data
     */
    cleanup: async (): Promise<void> => {
      try {
        await db.delete(UsersTable)
          .where(eq(UsersTable.email, testUser.email));
      } catch (error) {
        console.error('Failed to cleanup test user:', error);
        throw new Error('Test cleanup failed');
      }
    },

    /**
     * Create a test user with optional custom options
     */
    createTestUser: async (options: TestUserOptions = {}) => {
      try {
        const hashedPassword = await bcrypt.hash(testUser.password, 10);
        
        // Create user record
        const [user] = await db.insert(UsersTable).values({
          firstName: testUser.firstName || "DefaultFirstName",
          lastName: testUser.lastName || "DefaultLastName",
          email: testUser.email || "default@mail.com",
          password: hashedPassword,
          role: (options.role || testUser.role) === "admin" ? "admin" : "user",
          isVerified: testUser.isVerified ?? false,
          verificationCode: testUser.verificationCode || null
        }).returning();
   
        

        // If role is customer and skipCustomerCreation is not true, create customer record
        if (user.role === 'user' && !options.skipCustomerCreation) {
          await db.insert(CustomerTable).values({
          
            firstName: testUser.firstName,
            lastName: testUser.lastName,
            email: testUser.email,
            
            phoneNumber: testUser.phoneNumber || '1234567890',
            address: testUser.address || '123 Test St'
          });
        }

        // If isVerified is true, update the user's verification status
        if (options.isVerified) {
          await db
            .update(UsersTable)
            .set({ isVerified: true })
            .where(eq(UsersTable.email, testUser.email));
        }

        return user;
      } catch (error) {
        console.error('Failed to create test user:', error);
        throw new Error('Test user creation failed');
      }
    },

    /**
     * Get test user from database
     */
    getTestUser: async () => {
      try {
        const user = await db.query.UsersTable.findFirst({
          where: eq(UsersTable.email, testUser.email),
          with: {
            customer: true
          }
        });
        return user;
      } catch (error) {
        console.error('Failed to get test user:', error);
        throw new Error('Failed to retrieve test user');
      }
    },

    /**
     * Get authentication token for test user
     */
    getAuthToken: async (app: any): Promise<string> => {
      try {
        // Verify user exists and is verifiedjohn@example.com
        const user = await db.query.UsersTable.findFirst({
          where: eq(UsersTable.email, testUser.email)
        });

        if (!user) {
          throw new Error(`Test user ${testUser.email} not found`);
        }

        if (!user.isVerified) {
          throw new Error(`Test user ${testUser.email} is not verified`);
        }

        const response = await request(app)
          .post('/auth/login')
          .send({
            email: testUser.email,
            password: testUser.password
          });

        if (!response.body.token) {
          console.error('Login response:', response.body);
          throw new Error('No token returned from login');
        }

        return response.body.token;
      } catch (error) {
        console.error('Failed to get auth token:', error);
        throw new Error('Auth token retrieval failed');
      }
    }
  };
};

// Export default instance with default test user
export const testUtils = createTestUtils();