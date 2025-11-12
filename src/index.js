import express from "express";

import router from "./Routes/Routes.js";


import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;

// =========================
// Middleware
// =========================
app.use(express.json());

// CORS middleware — fixed
//let corsOptions = {
//  origin: [
 //   "https://dq63yhafhwp12.cloudfront.net", // CloudFront
 //   "http://dev-meme-erica.s3-website-us-east-1.amazonaws.com", // S3 website
  //  "http://localhost:5173", // Vite dev
  ],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
//};

app.use(cors(corsOptions));

// Logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} at ${new Date().toISOString()}`);
  next();
});

// =========================
// JWT Authentication Middleware
// =========================
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, "secretkey", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// =========================
// Routes
// =========================
app.use("/auth", authRouter);
app.use("/", router);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Merchant Api is live" });
});

app.get("/error-test", (req, res) => {
  throw new Error("Test error");
});

// =========================
// Global error handler
// =========================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// =========================
// Start server
// =========================
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
