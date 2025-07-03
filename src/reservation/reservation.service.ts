import db from "../Drizzle/db";
import { ReservationTable } from "../Drizzle/schema";
import { eq, sql } from "drizzle-orm";
import { TIReservation } from "../Drizzle/schema";

// Create Reservation
export const createReservationService = async (data: typeof ReservationTable.$inferInsert) => {
    return await db.insert(ReservationTable).values(data).returning();
  };
  
  // Get all Reservations
  export const getAllReservationsService = async () => {
    return await db.query.ReservationTable.findMany({
      columns:{
            reservationID:true,
            customerID:true,
            carID:true,
            reservationDate:true,
            pickupDate:true,
            returnDate:true,
  
      }
    }
      
    )
  };
  
  // Get Reservation by ID
  export const getReservationByIdService = async (id: number) => {
    return  await db.query.ReservationTable.findFirst({
      columns:{
        reservationID:true,
        customerID:true,
        carID:true,
        reservationDate:true,
        pickupDate:true,
        returnDate:true,
  
  
      },
      where:sql`${ReservationTable.reservationID}=${id}`
     
    })
    
  };
  
  // Update Reservation
  export const updateReservationService = async (id:number,reservation:Partial<TIReservation>)=>{
      const result = await db.update(ReservationTable).set(reservation).where(eq(ReservationTable.reservationID, id)).returning();
      return result[0];
  
  }
  
  // Delete car
  export const deleteReservationService = async (id: number) => {
    const result = await db.delete(ReservationTable).where(eq(ReservationTable.reservationID, id)).returning();
    return result[0];
  };
  