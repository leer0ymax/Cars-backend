import { Express } from "express";
import {
  createMaintenanceController,
  getAllMaintenancesController,
  getMaintenanceByIdController,
  updateMaintenanceController,
  deleteMaintenanceController,
} from "./maintenance.controller";
import { adminRoleAuth, bothRoleAuth, userRoleAuth } from "../middleware/bearAuth";

const maintenanceRoutes = (app: Express) => {
  app.post("/maintenances", createMaintenanceController);
  app.get("/maintenances",  getAllMaintenancesController);
  app.get("/maintenances/:id", getMaintenanceByIdController);
  app.put("/maintenances/:id",  updateMaintenanceController);
  app.delete("/maintenances/:id", deleteMaintenanceController);
};

export default maintenanceRoutes;
