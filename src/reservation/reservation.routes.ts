import { Express } from "express";
import {
  createReservationController,
  getAllReservationsController,
  getReservationByIdController,
  updateReservationController,
  deleteReservationController,
} from "./reservation.controller";
import { adminRoleAuth, bothRoleAuth, userRoleAuth } from "../middleware/bearAuth";

const reservationRoutes = (app: Express) => {
  app.post("/reservations",  createReservationController);
  app.get("/reservations",  getAllReservationsController);
  app.get("/reservations/:id", getReservationByIdController);
  app.put("/reservations/:id",  updateReservationController);
  app.delete("/reservations/:id",  deleteReservationController);
};

export default reservationRoutes;
