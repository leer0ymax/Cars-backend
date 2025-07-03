import { Request, Response } from "express";
import {
  createMaintenanceService,
  getAllMaintenancesService,
  getMaintenanceByIdService,
  updateMaintenanceService,
  deleteMaintenanceService,
} from "./maintenance.service";

// Create
export const createMaintenanceController = async (req: Request, res: Response) => {
   try {
    const maintenance = req.body
    const newMaintenance = await createMaintenanceService(maintenance)
    if(!newMaintenance){
        res.status(404).json({message:"error creating Maintenance"})
        return
    }
    res.status(200).json({message:"succescufully created", newMaintenance})
    
    
   } catch (error) {
    res.status(500).json({ message: "Error fetching Maintenance", error });
    
   }
};

// Read all
export const getAllMaintenancesController = async (req: Request, res: Response) => {
  try {
    const maintenance = await getAllMaintenancesService();
    if (!maintenance || maintenance.length === 0) {
        res.status(404).json({ message: "No maintenances found" });
      return 
    }
    res.status(200).json(maintenance);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Maintenance", error });
    
  }
};

// Read by ID
export const getMaintenanceByIdController = async (req: Request, res: Response) => {
  try {
    const maintenance = parseInt(req.params.id)
    const Maintenance = await getMaintenanceByIdService(maintenance)
    if(!Maintenance){
        res.status(404).json({message:'no maintenance'})
        return;

    }
    res.status(200).json({Maintenance})
    
  } catch (error) {
    console.error({message:"error ",error})
    res.status(500).json({ message: "server error"})
    
  }

};

// Update
export const updateMaintenanceController = async (req: Request, res: Response) => {
 
  try {
    const id = parseInt(req.params.id);
    const updated = await updateMaintenanceService(id, req.body);
    if (!updated) {
      res.status(404).json({ message: "Maintenance not found" });
      return;
    }
    res.status(200).json(updated);
    
  } catch (error) {
    
  }
};

// Delete
export const deleteMaintenanceController = async (req: Request, res: Response) => {
 
 try {
    
    const id = parseInt(req.params.id);
    const deleted = await deleteMaintenanceService(id);
    if (!deleted) {
      res.status(404).json({ message: "Maintenance not found" });
      return;
    }
    res.status(200).json({ message: "Maintenance deleted successfully" });
 } catch (error) {
    console.error({message:"error ",error})
    res.status(500).json({ message: "server error"})
    
 }
};
