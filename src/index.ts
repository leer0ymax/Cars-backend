import express from "express";
import customerRoutes from "./customer/customer.routes";
import bookingRoutes from "./booking/booking.routes"; // Verify the file exists at this path
import carRoutes from "./car/car.routes";
import paymentRoutes from "./payment/payment.routes";
import reservationRoutes from "./reservation/reservation.routes";       
import locationRoutes from "./location/location.routes";
import maintenanceRoutes from "./maintenance/maintenance.routes";
import insuranceRoutes from "./insurance/insurance.routes";
import authRoutes from "./auth/auth.routes";
import cors from 'cors'


const initializeApp = () => {
    const app = express();
app.use(express.json());

app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}));


customerRoutes(app);
bookingRoutes(app);
carRoutes(app);
paymentRoutes(app);
reservationRoutes(app);
locationRoutes(app);
maintenanceRoutes(app);
insuranceRoutes(app);
authRoutes(app);

return app;


}

const app = initializeApp();
export default app;



