import { Request, Response } from "express";
import {
  createLocationService,
  getAllLocationsService,
  getLocationByIdService,
  updateLocationService,
  deleteLocationService,
} from "./location.service";

// Create
export const createLocationController = async (req: Request, res: Response) => {
   try {
    const location = req.body
    const newLocation = await createLocationService(location)
    if(!newLocation){
        res.status(404).json({message:"error creating Location"})
        return
    }
    res.status(200).json({message:"succescufully created", newLocation})
    
    
   } catch (error) {
    res.status(500).json({ message: "Error fetching Location", error });
    
   }
};

// Read all
export const getAllLocationsController = async (req: Request, res: Response) => {
  try {
    const location = await getAllLocationsService();
    if (!location || location.length === 0) {
        res.status(404).json({ message: "No locations found" });
      return 
    }
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Location", error });
    
  }
};

// Read by ID
export const getLocationByIdController = async (req: Request, res: Response) => {
  try {
    const location = parseInt(req.params.id)
    const Location = await getLocationByIdService(location)
    if(!Location){
        res.status(404).json({message:'no location'})
        return;

    }
    res.status(200).json({Location})
    
  } catch (error) {
    console.error({message:"error ",error})
    res.status(500).json({ message: "server error"})
    
  }

};

// Update
export const updateLocationController = async (req: Request, res: Response) => {
 
  try {
    const id = parseInt(req.params.id);
    const updated = await updateLocationService(id, req.body);
    if (!updated) {
      res.status(404).json({ message: "Location not found" });
      return;
    }
    res.status(200).json(updated);
    
  } catch (error) {
    
  }
};

// Delete
export const deleteLocationController = async (req: Request, res: Response) => {
 
 try {
    
    const id = parseInt(req.params.id);
    const deleted = await deleteLocationService(id);
    if (!deleted) {
      res.status(404).json({ message: "Location not found" });
      return;
    }
    res.status(200).json({ message: "Location deleted successfully" });
 } catch (error) {
    console.error({message:"error ",error})
    res.status(500).json({ message: "Error deleting location", error });
    
 }
};
