import { Express } from "express";
import {
  createCarController,
  getAllCarsController,
  getCarByIdController,
  updateCarController,
  deleteCarController,
} from "./car.controller";
import { adminRoleAuth, bothRoleAuth, userRoleAuth } from "../middleware/bearAuth";


const carRoutes = (app: Express) => {
  app.post("/cars", createCarController);
  app.get("/cars",  getAllCarsController);
  app.get("/cars/:id", getCarByIdController);
  app.put("/cars/:id",  updateCarController);
  app.delete("/cars/:id", deleteCarController);
};

export default carRoutes;
