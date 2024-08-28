import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDb from "./config/db";
import productRoutes from "./routes/productRoutes"
dotenv.config();

const app:express.Application = express();
connectDb()
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
app.use("", productRoutes);

//port
const PORT:number = parseInt(process.env.PORT ?? '8080', 10);

//listen
app.listen(PORT, () => {
  console.log(
    "Node Server Running in Port http://localhost:${PORT}"
  );
});