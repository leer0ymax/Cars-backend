import { Express } from "express";
import {
  createCustomerController,
  getAllCustomersController,
  getCustomerByIdController,
  updateCustomerController,
  deleteCustomerController,
} from "./customer.controller";
import { adminRoleAuth, bothRoleAuth, userRoleAuth } from "../middleware/bearAuth";


const customerRoutes = (app: Express) => {
  app.post("/customers",  createCustomerController);
  app.get("/customers",  getAllCustomersController);
  app.get("/customers/:id",  getCustomerByIdController);
  app.put("/customers/:id", updateCustomerController);
  app.delete("/customers/:id", deleteCustomerController);
};

export default customerRoutes;
