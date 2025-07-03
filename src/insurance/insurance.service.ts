import db from "../Drizzle/db";
import { InsuranceTable, TIInsurance } from "../Drizzle/schema";
import { eq, sql } from "drizzle-orm";

// Create insurance
export const createInsuranceService = async (data: typeof InsuranceTable.$inferInsert) => {
  return await db.insert(InsuranceTable).values(data).returning();
};

// Get all Insurances
export const getAllInsurancesService = async () => {
  return await db.query.InsuranceTable.findMany({
    columns:{
        insuranceID:true,
        carID:true,
        insuranceProvider:true,
        policyNumber:true,
        startDate:true,
        endDate:true


    }
  }
    
  )
};

// Get insurance by ID
export const getInsuranceByIdService = async (id: number) => {
  return  await db.query.InsuranceTable.findFirst({
    columns:{
        insuranceID:true,
        carID:true,
        insuranceProvider:true,
        policyNumber:true,
        startDate:true,
        endDate:true


    },
    where:sql`${InsuranceTable.carID}=${id}`
   
  })
  
};

// Update Insurance
export const updateInsuranceService = async (id:number,insurance:Partial<TIInsurance>)=>{
    const result = await db.update(InsuranceTable).set(insurance).where(eq(InsuranceTable.insuranceID, id)).returning();
    return result[0];

}

// Delete Insurance
export const deleteInsuranceService = async (id: number) => {
  const result = await db.delete(InsuranceTable).where(eq(InsuranceTable.insuranceID, id)).returning();
  return result[0];
};
