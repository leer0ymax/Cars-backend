import db from "../Drizzle/db";
import { PaymentTable, TIPayment } from "../Drizzle/schema";
import { eq, sql } from "drizzle-orm";



// Create Payment
export const createPaymentService = async (data: typeof PaymentTable.$inferInsert) => {
    // return await db.insert(PaymentTable).values(data).returning();
    const [inserted] = await db.insert(PaymentTable).values(data).returning()
    if(inserted){
      return inserted
    }
    return null
  };
  
  // Get all Payment
  export const getAllPaymentsService = async () => {
    return await db.query.PaymentTable.findMany({
      columns:{
            paymentID:true,
            bookingID:true,
            paymentDate:true,
            amount:true,
            paymentMethod:true
  
  
      }
    }
      
    )
  };
  
  // Get Payment by ID
  export const getPaymentByIdService = async (id: number) => {
    const payment = await db.query.PaymentTable.findFirst({
      where: eq(PaymentTable.paymentID, id)
    })
    return payment
    
  };
  
  // Update Payment
  export const updatePaymentService = async (id:number,payment:Partial<TIPayment>)=>{
      const result = await db.update(PaymentTable).set(payment).where(eq(PaymentTable.paymentID, id)).returning();
      return result[0];
  
  }
  
  // Delete Payment
  export const deletePaymentService = async (id: number) => {
    const result = await db.delete(PaymentTable).where(eq(PaymentTable.paymentID, id)).returning();
    return result[0];
  };
  