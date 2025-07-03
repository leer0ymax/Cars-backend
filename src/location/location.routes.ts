import { Express } from "express";
import {
  createLocationController,
  getAllLocationsController,
  getLocationByIdController,
  updateLocationController,
  deleteLocationController,
} from "./location.controller";
import { adminRoleAuth, bothRoleAuth, userRoleAuth } from "../middleware/bearAuth";

const locationRoutes = (app: Express) => {
  app.post("/locations",  createLocationController);
  app.get("/locations", getAllLocationsController);
  app.get("/locations/:id",  getLocationByIdController);
  app.put("/locations/:id", updateLocationController);
  app.delete("/locations/:id",  deleteLocationController);
};

export default locationRoutes;
