import { Express } from "express";
import {
  createPaymentController,
  getAllPaymentsController,
  getPaymentByIdController,
  updatePaymentController,
  deletePaymentController,
} from "./payment.controller";
import { adminRoleAuth, bothRoleAuth, userRoleAuth } from "../middleware/bearAuth";

const paymentRoutes = (app: Express) => {
  app.post("/payments", createPaymentController);
  app.get("/payments",  getAllPaymentsController);
  app.get("/payments/:id", getPaymentByIdController);
  app.put("/payments/:id", updatePaymentController);
  app.delete("/payments/:id",  deletePaymentController);
};

export default paymentRoutes;
