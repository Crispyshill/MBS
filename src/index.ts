import express, { Application, Request, Response, NextFunction } from "express";
import authRoutes from "./routes/auth";
import * as dotenv from "dotenv";
const cors = require("cors");
dotenv.config();


const app: Application = express();
const PORT = process.env.PORT || 3000;


const corsOptions = {
  origin: process.env.FRONTEND_URL, // Allow only this origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  credentials: true, // Allow cookies to be sent
};

// Enable CORS with specific options
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Mount the auth routes
app.use("/auth", authRoutes);

// Error Handling Middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
