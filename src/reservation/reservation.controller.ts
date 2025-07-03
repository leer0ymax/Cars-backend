import { Request, Response } from "express";
import {
  createReservationService,
  getAllReservationsService,
  getReservationByIdService,
  updateReservationService,
  deleteReservationService,
} from "./reservation.service";

// Create
export const createReservationController = async (req: Request, res: Response) => {
   try {
    const reservation = req.body
    const newReservation = await createReservationService(reservation)
    if(!newReservation){
        res.status(404).json({message:"error creating Reservation"})
        return
    }
    res.status(200).json({message:"succescufully created", newReservation})
    
    
   } catch (error) {
    res.status(500).json({ message: "Error fetching Reservation", error });
    
   }
};

// Read all
export const getAllReservationsController = async (req: Request, res: Response) => {
  try {
    const reservation = await getAllReservationsService();
    if (!reservation || reservation.length === 0) {
        res.status(404).json({ message: "No Reservation found" });
      return 
    }
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Reservation", error });
    
  }
};

// Read by ID
export const getReservationByIdController = async (req: Request, res: Response) => {
  try {
    const reservation = parseInt(req.params.id)
    const Reservation = await getReservationByIdService(reservation)
    if(!Reservation){
        res.status(404).json({message:'no Reservation'})
        return;

    }
    res.status(200).json({Reservation})
    
  } catch (error) {
    console.error({message:"error ",error})
    res.status(500).json({ message: "server error"})
    
  }

};

// Update
export const updateReservationController = async (req: Request, res: Response) => {
 
  try {
    const id = parseInt(req.params.id);
    const updated = await updateReservationService(id, req.body);
    if (!updated) {
      res.status(404).json({ message: "Reservation not found" });
      return;
    }
    res.status(200).json(updated);
    
  } catch (error) {
    
  }
};

// Delete
export const deleteReservationController = async (req: Request, res: Response) => {
 
 try {
    
    const id = parseInt(req.params.id);
    const deleted = await deleteReservationService(id);
    if (!deleted) {
      res.status(404).json({ message: "Reservation not found" });
      return;
    }
    res.status(200).json({ message: "Reservation deleted successfully" });
 } catch (error) {
    console.error({message:"error ",error})
    res.status(500).json({ message: "server error"})
    
 }
};