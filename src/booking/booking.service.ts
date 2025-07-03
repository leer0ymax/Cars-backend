import db from "../Drizzle/db";
import { BookingsTable, TIBooking } from "../Drizzle/schema";
import { eq, sql } from "drizzle-orm";

// Create Booking
export const createBookingService = async (data: typeof BookingsTable.$inferInsert) => {
  return await db.insert(BookingsTable).values(data).returning();
};

// Get all bookings
export const getAllBookingsService = async () => {
  return await db.query.BookingsTable.findMany({
    columns:{
      bookingID:true,
        carID:true,
        customerID:true,
        rentalStartDate:true,
        rentalEndDate:true,
        totalAmount:true

    }
  }
    
  )
};

// Get booking by ID
export const getBookingByIdService = async (id: number) => {
  try{
    console.log(id)

  return  await db.query.BookingsTable.findFirst({
    columns:{
      bookingID:true,
        carID:true,
        customerID:true,
        rentalStartDate:true,
        rentalEndDate:true,
        totalAmount:true


    },
    where:sql`${BookingsTable.bookingID}=${id}`
   
  })

}catch(error){
  console.log("error")
}
  
};

// Update booking
export const updateBookingService = async (id:number,booking:Partial<TIBooking>)=>{
    const result = await db.update(BookingsTable).set(booking).where(eq(BookingsTable.bookingID, id)).returning();
    return result[0];

}

// Delete booking
export const deleteBookingService = async (id: number) => {
  const result = await db.delete(BookingsTable).where(eq(BookingsTable.bookingID, id)).returning();
  return result[0];
};
