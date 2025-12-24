// server.js
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import linkRoutes from "./routes/linkRoutes.js";

const app = express();

const corsOptions = {
    origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Node.js JWT Authentication application." });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/test", userRoutes);
app.use("/api/link", linkRoutes);

// Set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});