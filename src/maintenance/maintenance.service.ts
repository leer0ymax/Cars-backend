import db from "../Drizzle/db";
import { MaintenanceTable, TIMaintenance } from "../Drizzle/schema";
import { eq, sql } from "drizzle-orm";

// Create Maintenance
export const createMaintenanceService = async (data: typeof MaintenanceTable.$inferInsert) => {
  return await db.insert(MaintenanceTable).values(data).returning();
};

// Get all Maintenance
export const getAllMaintenancesService = async () => {
  return await db.query.MaintenanceTable.findMany({
    columns:{
        maintenanceID:true,
        carID:true,
        maintenanceDate:true,
        description:true,
        cost:true,
        
    }
  }
    
  )
};

// Get Maintenance by ID
export const getMaintenanceByIdService = async (id: number) => {
  return  await db.query.MaintenanceTable.findFirst({
    columns:{
        maintenanceID:true,
        carID:true,
        maintenanceDate:true,
        description:true,
        cost:true,


    },
    where:sql`${MaintenanceTable.maintenanceID}=${id}`
   
  })
  
};

// Update Maintenance
export const updateMaintenanceService = async (id:number,maintenance:Partial<TIMaintenance>)=>{
    const result = await db.update(MaintenanceTable).set(maintenance).where(eq(MaintenanceTable.maintenanceID, id)).returning();
    return result[0];

}

// Delete Maintenance
export const deleteMaintenanceService = async (id: number) => {
  const result = await db.delete(MaintenanceTable).where(eq(MaintenanceTable.maintenanceID, id)).returning();
  return result[0];
};
