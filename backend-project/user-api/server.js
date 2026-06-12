const express = require("express");
const logger = require("./middleware/logger");
const userRoutes = require("./routes/users");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(logger);

// Routes
app.use("/", userRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("User API is Running");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});