import { Request, Response } from "express";
import {
  createPaymentService,
  getAllPaymentsService,
  getPaymentByIdService,
  updatePaymentService,
  deletePaymentService,
} from "./payment.service";

// Create
export const createPaymentController = async (req: Request, res: Response) => {
   try {
    const payment = req.body
    const newPayment = await createPaymentService(payment)
    if(!newPayment){
        res.status(404).json({message:"error creating Payment"})
        return
    }
    res.status(200).json({message:"succescufully created", newPayment})
    
    
   } catch (error) {
    res.status(500).json({ message: "Error fetching Payment", error });
    
   }
};

// Read all
export const getAllPaymentsController = async (req: Request, res: Response) => {
  try {
    const payment = await getAllPaymentsService();
    if (!payment || payment.length === 0) {
        res.status(404).json({ message: "No Payment found" });
      return 
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Payment", error });
    
  }
};

// Read by ID
export const getPaymentByIdController = async (req: Request, res: Response) => {
  try {
    const payment = parseInt(req.params.id)
    const Payment = await getPaymentByIdService(payment)
    if(!Payment){
        res.status(404).json({message:'no Payment'})
        return;

    }
    res.status(200).json({Payment})
    
  } catch (error) {
    console.error({message:"error ",error})
    res.status(500).json({ message: "server error"})
    
  }

};

// Update
export const updatePaymentController = async (req: Request, res: Response) => {
 
  try {
    const id = parseInt(req.params.id);
    const updated = await updatePaymentService(id, req.body);
    if (!updated) {
      res.status(404).json({ message: "Payment not found" });
      return;
    }
    res.status(200).json(updated);
    
  } catch (error) {
    
  }
};

// Delete
export const deletePaymentController = async (req: Request, res: Response) => {
 
 try {
    
    const id = parseInt(req.params.id);
    const deleted = await deletePaymentService(id);
    if (!deleted) {
      res.status(404).json({ message: "Payment not found" });
      return;
    }
    res.status(200).json({ message: "Payment deleted successfully" });
 } catch (error) {
    console.error({message:"error ",error})
    res.status(500).json({ message: "server error"})
    
 }
};
