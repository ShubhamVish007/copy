import express from "express";
const app = express();
import dotenv from 'dotenv';
import { connectDatabase } from "./config/dbConnect.js";
import errorMiddleware from "./middlewares/errors.js";

dotenv.config({ path: "backend/config/config.env" });
// connect database
connectDatabase();

app.use(express.json());


// importing all routes
import productRoutes from "./routes/products.js";

app.use("/api/v1", productRoutes);

//using error Middleware
app.use(errorMiddleware);


const server = app.listen(process.env.PORT, () => {
    console.log(`server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});


//Handle unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
    console.log(`ERROR: ${err}`);
    console.log('Shutting down server due to unhandled promise rejection');
    server.close(() => {
        process.exit(1);
    });
});