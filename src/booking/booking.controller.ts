import {
    createBookingService,
    getAllBookingsService,
    getBookingByIdService,
    updateBookingService,
    deleteBookingService
  } from "../booking/booking.service";
  
  import { Request, Response } from "express";
  
  // Create
  export const createBookingController = async (req: Request, res: Response) => {
     try {
      const booking = req.body
      const newBooking = await createBookingService(booking)
      if(!newBooking){
          res.status(404).json({message:"error creating booking"})
          return
      }
      res.status(200).json({message:"successfully created", newBooking})
      
      
     } catch (error) {
      res.status(500).json({ message: "Error fetching booking", error });
      
     }
  };
  
  // Read all
  export const getAllBookingsController = async (req: Request, res: Response) => {
    try {
      const bookings = await getAllBookingsService();
      if (!bookings || bookings.length === 0) {
          res.status(404).json({ message: "No bookings found" });
        return 
      }
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Error fetching bookings", error });
      
    }
  };
  
  // Read by ID
  export const getBookingByIdController = async (req: Request, res: Response) => {
    try {
      const booking = parseInt(req.params.id)
      const Booking = await getBookingByIdService(booking)

      console.log("Bookinf :" + Booking)
      if(!Booking){
          res.status(404).json({message:'no booking found'})
          return;
  
      }
      res.status(200).json({Booking})
      
    } catch (error) {
      console.error({message:"error ",error})
      res.status(500).json({ message: "server error"})
      
    }
  
  };
  
  // Update
  export const updateBookingController = async (req: Request, res: Response) => {
   
    try {
      const id = parseInt(req.params.id);
      const updated = await updateBookingService(id, req.body);
      if (!updated) {
        res.status(404).json({ message: "Booking not found" });
        return;
      }
      res.status(200).json(updated);
      
    } catch (error) {
      
    }
  };
  
  // Delete
  export const deleteBookingController = async (req: Request, res: Response) => {
   
   try {
      
      const id = parseInt(req.params.id);
      const deleted = await deleteBookingService(id);
      if (!deleted) {
        res.status(404).json({ message: "Booking not found" });
        return;
      }
      res.status(200).json({ message: "Booking deleted successfully" });
   } catch (error) {
      console.error({message:"error ",error})
      res.status(500).json({ message: "server error"})
      
   }
  };
  