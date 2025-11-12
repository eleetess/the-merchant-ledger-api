import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken"; //  needed for authenticateToken
import router from "./Routes/Routes.js";
// import authRouter from "./Routes/AuthRoutes.js"; //

// =========================
// Config
// =========================
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// =========================
// Middleware
// =========================
app.use(express.json());

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://the-merchant-ledger-gqha80bmx-erica-lee-tesseos-projects.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

//  Logger middleware
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

  jwt.verify(token, process.env.JWT_SECRET || "secretkey", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// =========================
// Routes
// =========================
//
// app.use("/auth", authRouter);
app.use("/", router);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Merchant API is live " });
});

app.get("/error-test", (req, res) => {
  throw new Error("Test error");
});

// =========================
// Global error handler
// =========================
app.use((err, req, res, next) => {
  console.error(" Error:", err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// =========================
// Start server
// =========================
app.listen(port, () => {
  console.log(` Server running on port ${port}`);
});
