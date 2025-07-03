import db from "../Drizzle/db";
import { CustomerTable, TICustomer } from "../Drizzle/schema";
import { eq, sql } from "drizzle-orm";

// Create customer
export const createCustomerService = async (data: typeof CustomerTable.$inferInsert) => {
  return await db.insert(CustomerTable).values(data).returning();
};

// Get all customers
export const getAllCustomersService = async () => {
  return await db.query.CustomerTable.findMany({
    columns:{
        customerID:true,
        firstName:true,
        lastName:true,
        email:true,
        phoneNumber:true,
        address:true,
       


    }
  }
    
  )
};

// Get customer by ID
export const getCustomerByIdService = async (id: number) => {
  return  await db.query.CustomerTable.findFirst({
    columns:{
      customerID:true,
      firstName:true,
      lastName:true,
      email:true,
      phoneNumber:true,
      address:true,

    },
    where:sql`${CustomerTable.customerID}=${id}`
  })
  
};

// Update customer
export const updateCustomerService = async (id:number,car:Partial<TICustomer>)=>{
    const result = await db.update(CustomerTable).set(car).where(eq(CustomerTable.customerID, id)).returning();
    return result[0];

}

// Delete customer
export const deleteCustomerService = async (id: number) => {
  try {
    const result = await db.delete(CustomerTable).where(eq(CustomerTable.customerID, id)).returning();
    if (result.length === 0) {
      return false; // No customer found to delete
    }
    return true; // Customer deleted successfully
    
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw new Error("Failed to delete customer");
    
  }
};
