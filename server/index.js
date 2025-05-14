import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "./config.js";
import publicRoutes from "./src/routes/publicRoutes.js"
import adminRoutes from "./src/routes/adminRoutes.js"; // Adjust the import path as needed
import userRoutes from "./src/routes/userRoutes.js"; // Adjust the import path as needed
import invRoutes from "./src/routes/invRoutes.js"; // Adjust the import path as needed
import memberRoutes from "./src/routes/memberRoutes.js"; // Adjust the import path as needed
import uploadRoutes from "./src/routes/uploadRoutes.js";
import facilityRoutes from "./src/routes/facilityRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import billingRoutes from "./src/routes/billingRoutes.js";
import tableRoutes from "./src/routes/TableRoutes.js";
import kitchenRoutes from "./src/routes/kitchenRoutes.js";
import reportRoutes from "./src/routes/reportRoutes.js"


// Load environment variables from .env file
dotenv.config();

// Handle __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Middleware
app.options("*", cors({ origin: '*', optionsSuccessStatus: 200 }));
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));



// Routes
app.get('/api/data', (req, res) => {
  res.json({ message: 'CORS is enabled and open for all origins!' });
});

const PORT = process.env.PORT || 3000; // Default port to 3000 if not specified

app.use(express.json());

// Setup Morgan for logging
// Create a write stream (in append mode) for logging
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

// Define a custom token for the complete message
morgan.token(
  "message",
  (req, res) =>
    `Method: ${req.method}, URL: ${req.url}, Status: ${res.statusCode}, Message: ${res.statusMessage}`
);

// Define a custom format that includes the custom token
// const customFormat = '[:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :message';
app.use(
  morgan((tokens, req, res) => {
    return JSON.stringify({
      ip: tokens["remote-addr"](req, res),
      timestamp: tokens["date"](req, res, "iso"),
      method: tokens["method"](req, res),
      endpoint: tokens["url"](req, res),
      protocol: req.protocol,
      status: tokens["status"](req, res),
      responseSize: tokens["res"](req, res, "content-length"),
      referrer: tokens["referrer"](req, res) || "-",
      userAgent: tokens["user-agent"](req, res),
    });
  })
);
app.use(
  morgan(
    (tokens, req, res) => {
      return JSON.stringify({
        ip: tokens["remote-addr"](req, res),
        timestamp: tokens["date"](req, res, "iso"),
        method: tokens["method"](req, res),
        endpoint: tokens["url"](req, res),
        protocol: req.protocol,
        status: tokens["status"](req, res),
        responseSize: tokens["res"](req, res, "content-length"),
        referrer: tokens["referrer"](req, res) || "-",
        userAgent: tokens["user-agent"](req, res),
      });
    },
    { stream: accessLogStream }
  )
);

// Connect to MongoDB
mongoose
  .connect(config.connectionString)
  .then(() => {
    console.log("Connected with MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/public/", publicRoutes)
  // Routes
app.use("/api/utility/", uploadRoutes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/memberpics', express.static(path.join(__dirname, 'uploads', 'memberpics')));
app.use('/functionpics', express.static(path.join(__dirname, 'uploads', 'functionpic')));
app.use("/api/admin/", adminRoutes);

app.use("/api/user/", userRoutes);
app.use("/api/user/inv/", invRoutes);
app.use("/api/user/", memberRoutes);
app.use("/api/facilities/", facilityRoutes);
app.use("/api/orders/", orderRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/table/", tableRoutes);
app.use("/api/kitchen/", kitchenRoutes)
app.use("/api/report/", reportRoutes)



app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
