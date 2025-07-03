import db from "../Drizzle/db";
import { LocationTable, TILocation } from "../Drizzle/schema";
import { eq, sql } from "drizzle-orm";

// Create Location
export const createLocationService = async (data: typeof LocationTable.$inferInsert) => {
  return await db.insert(LocationTable).values(data).returning();
};

// Get all Location
export const getAllLocationsService = async () => {
  return await db.query.LocationTable.findMany({
    columns:{
        locationID:true,
        locationName:true,
        address:true,
        contactNumber:true


    }
  }
    
  )
};

// Get location by ID
export const getLocationByIdService = async (id: number) => {
  return  await db.query.LocationTable.findFirst({
    columns:{
        locationID:true,
        locationName:true,
        address:true,
        contactNumber:true


    },
    where:sql`${LocationTable.locationID}=${id}`
   
  })
  
};

// Update Location
export const updateLocationService = async (id:number,location:Partial<TILocation>)=>{
    const result = await db.update(LocationTable).set(location).where(eq(LocationTable.locationID, id)).returning();
    return result[0];

}

// Delete Location
export const deleteLocationService = async (id: number) => {
  const result = await db.delete(LocationTable).where(eq(LocationTable.locationID, id)).returning();
  return result[0];
};
