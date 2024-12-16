import express, { Application, Request, Response, NextFunction } from "express";
import authRoutes from "./routes/auth";
import * as dotenv from "dotenv";
dotenv.config();


const app: Application = express();
const PORT = process.env.PORT || 3000;

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
