import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./DB/Database.js";
import transactionRoutes from "./Routers/Transactions.js";
import userRoutes from "./Routers/userRouter.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

connectDB();

app.use(cors());
app.use(helmet()); // Security Headers
app.use(morgan("dev")); // Logging
app.use(express.json());

app.use("/api/v1", transactionRoutes);
app.use("/api/auth", userRoutes);

app.get("/", (req, res) => res.send("🚀 FinManager Server is running!"));

app.listen(port, () => console.log(`🔥 Server running at http://localhost:${port}`));