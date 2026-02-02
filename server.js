require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const connectDB = require("./config/db");
const sensorRoutes = require("./routes/sensorRoutes");
const initSocket = require("./sockets/socketHandler");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/sensor", sensorRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("✅ Cardiac Health Backend Running");
});

const server = http.createServer(app);

// DB + Socket
connectDB();
initSocket(server);

server.listen(process.env.PORT || 5000, () => {
  console.log("🚀 Server running on port 5000");
});