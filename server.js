const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log("=============================");
  console.log("Request:", req.method, req.path);
  console.log("Time:", new Date().toLocaleString());
  console.log("=============================");
  next();
});
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

app.get("/", (req, res) => {
  res.send("SkillNest Backend is running!");
});

const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const messageRoutes = require("./routes/messageRoutes");

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/messages", messageRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});