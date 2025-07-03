import { Express } from "express";
import {
  createBookingController,
  getAllBookingsController,
  getBookingByIdController,
  updateBookingController,
  deleteBookingController,
} from "./booking.controller";
import { adminRoleAuth, bothRoleAuth, userAuth, userRoleAuth } from "../middleware/bearAuth";
 

const bookingRoutes = (app: Express) => {
  app.post("/bookings", createBookingController);
  app.get("/bookings", getAllBookingsController);
  app.get("/bookings/:id",  getBookingByIdController);
  app.put("/bookings/:id",  updateBookingController);
  app.delete("/bookings/:id", deleteBookingController);
};

export default bookingRoutes;
