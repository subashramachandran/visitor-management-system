const dns = require("dns");

// Force Node.js to use Google DNS for MongoDB Atlas SRV
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();


// =====================
// Middleware
// =====================

app.use(express.json());

app.use(cors());


// =====================
// API Routes
// =====================

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use(
  "/api/employees",
  require("./routes/employeeRoutes")
);

app.use(
  "/api/visitors",
  require("./routes/visitorRoutes")
);

app.use(
  "/api/reports",
  require("./routes/reportRoutes")
);

app.use(
  "/api/activities",
  require("./routes/activityRoutes")
);

app.use(
  "/api/users",
  require("./routes/userRoutes")
);

app.use(
  "/api/dashboard",
  require("./routes/dashboardRoutes")
);


// =====================
// Error Handler
// =====================

app.use(errorHandler);


// =====================
// Start Server
// =====================

const PORT = process.env.PORT || 5000;

const startServer = async () => {

  try {

    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    app.listen(PORT, () => {

      console.log(
        `Server running on port ${PORT}`
      );

    });

  } catch (error) {

    console.error("MongoDB Connection Failed:");
    console.error(error);

    process.exit(1);

  }

};


startServer();