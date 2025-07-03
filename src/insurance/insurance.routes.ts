import { Express } from "express";
import {
  createInsuranceController,
  getAllInsurancesController,
  getInsuranceByIdController,
  updateInsuranceController,
  deleteInsuranceController,
} from "./insurance.controller";
import { adminRoleAuth, bothRoleAuth, userRoleAuth } from "../middleware/bearAuth";

const insuranceRoutes = (app: Express) => {
  app.post("/insurances",  createInsuranceController);
  app.get("/insurances",  getAllInsurancesController);
  app.get("/insurances/:id", getInsuranceByIdController);
  app.put("/insurances/:id",  updateInsuranceController);
  app.delete("/insurances/:id",  deleteInsuranceController);
};

export default insuranceRoutes;
