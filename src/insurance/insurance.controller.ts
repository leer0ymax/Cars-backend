import { Request, Response } from "express";
import {
  createInsuranceService,
  getAllInsurancesService,
  getInsuranceByIdService,
  updateInsuranceService,
  deleteInsuranceService,
} from "./insurance.service";


// Create
export const createInsuranceController = async (req: Request, res: Response) => {
   try {
    const insurance = req.body
    const newInsurance = await createInsuranceService(insurance)
    if(!newInsurance){
        res.status(404).json({message:"error creating Insurance"})
        return
    }
    res.status(200).json({message:"succescufully created", newInsurance})
    
    
   } catch (error) {
    res.status(500).json({ message: "Error fetching Insurance", error });
    
   }
};

// Read all
export const getAllInsurancesController = async (req: Request, res: Response) => {
  try {
    const insurance = await getAllInsurancesService();
    if (!insurance || insurance.length === 0) {
        res.status(404).json({ message: "No insurances found" });
      return 
    }
    res.status(200).json(insurance);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Insurance", error });
    
  }
};

// Read by ID
export const getInsuranceByIdController = async (req: Request, res: Response) => {
  try {
    const insurance = parseInt(req.params.id)
    const Insurance = await getInsuranceByIdService(insurance)
    if(!Insurance){
        res.status(404).json({message:'no insurance'})
        return;

    }
    res.status(200).json({Insurance})
    
  } catch (error) {
    console.error({message:"error ",error})
    res.status(500).json({ message: "server error"})
    
  }

};

// Update
export const updateInsuranceController = async (req: Request, res: Response) => {
 
  try {
    const id = parseInt(req.params.id);
    const updated = await updateInsuranceService(id, req.body);
    if (!updated) {
      res.status(404).json({ message: "Insurance not found" });
      return;
    }
    res.status(200).json(updated);
    
  } catch (error) {
    
  }
};

// Delete
export const deleteInsuranceController = async (req: Request, res: Response) => {
 
 try {
    
    const id = parseInt(req.params.id);
    const deleted = await deleteInsuranceService(id);
    if (!deleted) {
      res.status(404).json({ message: "Insurance not found" });
      return;
    }
    res.status(200).json({ message: "Insurance deleted successfully" });
 } catch (error) {
    console.error({message:"error ",error})
    res.status(500).json({ message: "Error deleting insurance"})
    
 }
};
