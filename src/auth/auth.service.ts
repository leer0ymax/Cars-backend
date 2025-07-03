// Database
import { eq, sql } from "drizzle-orm";
import db from "../Drizzle/db";
import { TIUser, UsersTable } from "../Drizzle/schema";

export const createUserService = async (user: TIUser) => {
    
    await db.insert(UsersTable).values(user)
    return "User created successfully";
}

export const getUserByEmailService = async (email: string) => {
    return await db.query.UsersTable.findFirst({
        where: sql`${UsersTable.email} = ${email}`
    });
};

export const verifyUserService = async (email: string) => {
    await db.update(UsersTable)
        .set({ isVerified: true, verificationCode: null })
        .where(sql`${UsersTable.email} = ${email}`);
}


//login a user
export const userLoginService = async (user: TIUser) => {
    // email and password
    const { email } = user;

    return await db.query.UsersTable.findFirst({
             where: eq(UsersTable.email, email
        )
    })
}
// get user by ID
export const getUserByIdService = async (id: number) => {
    return await db.query.UsersTable.findFirst({
        where: sql`${UsersTable.id} = ${id}`
    });
}
// get all users
export const getAllUsersService = async () => {
    return await db.query.UsersTable.findMany({
        columns: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            isVerified: true,
            
        }
    });
}

