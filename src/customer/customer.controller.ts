import { Request, Response } from "express";
import {
  createCustomerService,
  getAllCustomersService,
  getCustomerByIdService,
  updateCustomerService,
  deleteCustomerService,
} from "./customer.service";

// Create
export const createCustomerController = async (req: Request, res: Response) => {
  const result = await createCustomerService(req.body);
  res.status(201).json(result);
};

// Read all
export const getAllCustomersController = async (_req: Request, res: Response) => {
 try {
  const customers = await getAllCustomersService();
  if (!customers || customers.length === 0) {
    res.status(404).json({ message: "No customers found" });
    return;
  }
  res.status(200).json(customers);
  
 } catch (error) {
  res.status(500).json({ message: "Error fetching customers", error });

  
 }
}

// Read by ID
export const getCustomerByIdController = async (req: Request, res: Response) => {
  try {
    const customer = parseInt(req.params.id)
    const Customer = await getCustomerByIdService(customer)
    if(!Customer){
        res.status(404).json({message:'no customer'})
        return;

    }
    res.status(200).json({Customer})
    
  } catch (error) {
    console.error({message:"error ",error})
    res.status(500).json({ message: "server error"})
    
  }

};

// Update
export const updateCustomerController = async (req: Request, res: Response) => {
 try {
  const id = parseInt(req.params.id);
  const updated = await updateCustomerService(id, req.body);
  if (!updated) {
    res.status(404).json({ message: "Customer not found" });
    return;
  }
  res.status(200).json(updated);
  
 } catch (error) {
  res.status(500).json({ message: "Error updating customer", error });
  
  
 }
};

// Delete
export const deleteCustomerController = async (req: Request, res: Response) => {
 try {
  const id = parseInt(req.params.id);
  const deleted = await deleteCustomerService(id);
  if (!deleted) {
    res.status(404).json({ message: "Customer not found" });
    return;
  }
  res.status(200).json({ message: "Customer deleted successfully" });
  
 } catch (error) {
  console.error({message:"error ",error})
  res.status(500).json({ message: "Error deleting customer" });

  
 }
};
