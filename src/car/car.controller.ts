import { Request, Response } from "express";
import {
  createCarService,
  getAllCarsService,
  getCarByIdService,
  updateCarService,
  deleteCarService,
} from "./car.service";

// Create
export const createCarController = async (req: Request, res: Response) => {
   try {
    const car = req.body
    const newCar = await createCarService(car)
    if(!newCar){
        res.status(404).json({message:"error creating cars"})
        return
    }
    res.status(200).json({message:"successfully created", newCar})
    
    
   } catch (error) {
    res.status(500).json({ message: "Error fetching cars", error });
    
   }
};

// Read all
export const getAllCarsController = async (req: Request, res: Response) => {
  try {
    const cars = await getAllCarsService();
    console.log(cars)
    if (!cars || cars.length === 0) {
        res.status(404).json({ message: "No cars found" });
      return 
    }
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cars", error });
    
  }
};

// Read by ID
export const getCarByIdController = async (req: Request, res: Response) => {
  try {
    const car = parseInt(req.params.id)
    const Car = await getCarByIdService(car)
    if(!Car){
        res.status(404).json({message:'no car'})
        return;

    }
    res.status(200).json({Car})
    
  } catch (error) {
    console.error({message:"error ",error})
    res.status(500).json({ message: "server error"})
    
  }

};

// Update
export const updateCarController = async (req: Request, res: Response) => {
 
  try {
    const id = parseInt(req.params.id);
    const updated = await updateCarService(id, req.body);
    if (!updated) {
      res.status(404).json({ message: "Car not found" });
      return;
    }
    res.status(200).json(updated);
    
  } catch (error) {
    
  }
};

// Delete
export const deleteCarController = async (req: Request, res: Response) => {
 
 try {
    
    const id = parseInt(req.params.id);
    const deleted = await deleteCarService(id);
    if (!deleted) {
      res.status(404).json({ message: "Car not found" });
      return;
    }
    res.status(200).json({ message: "Car deleted successfully" });
 } catch (error) {
    console.error({message:"error ",error})
    res.status(500).json({ message: "server error"})
    
 }
};
