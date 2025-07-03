import db from "../Drizzle/db";
import { CarTable, InsuranceTable, MaintenanceTable, ReservationTable, BookingsTable, TICar } from "../Drizzle/schema";
import { eq, sql } from "drizzle-orm";

// Create car
export const createCarService = async (data: typeof CarTable.$inferInsert) => {
  return await db.insert(CarTable).values(data).returning();
};

// Get all cars with reservations,bookings,maintenance and insurance
export const getAllCarsService = async () => {
//   const car = await db.select().from(CarTable)
// .leftJoin(ReservationTable as any, eq(CarTable.carID, ReservationTable.carID))
//  .leftJoin(BookingsTable as any, eq(CarTable.carID, BookingsTable.carID)) 
//  .leftJoin(MaintenanceTable as any, eq(CarTable.carID, MaintenanceTable.carID))
//   .leftJoin(InsuranceTable as any, eq(CarTable.carID, InsuranceTable.carID));
//   if (car.length === 0) {
//     return "No cars available";
//   }
//   return car;
// };
  return db.query.CarTable.findMany({
    columns:{
        carID:true,
        carModel:true,
        year:true,
        color:true,
        rentalRate:true,
        availability:true,
        locationID:true


    }
  })
   
};
// Get car by ID
export const getCarByIdService = async (id: number) => {
  return  await db.query.CarTable.findFirst({
    columns:{
        carID:true,
        carModel:true,
        year:true,
        color:true,
        rentalRate:true,
        availability:true,
        locationID:true


    },
    where:sql`${CarTable.carID}=${id}`
   
  })
  
};

// Update car
export const updateCarService = async (id:number,car:Partial<TICar>)=>{
    const result = await db.update(CarTable).set(car).where(eq(CarTable.carID, id)).returning();
    return result[0];

}

// Delete car
export const deleteCarService = async (id: number) => {
  const result = await db.delete(CarTable).where(eq(CarTable.carID, id)).returning();
  return result[0];
};
