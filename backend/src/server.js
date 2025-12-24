// server.js
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import linkRoutes from "./routes/linkRoutes.js";
import redirectRoutes from "./routes/redirectRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const corsOptions = {
    origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Configurer Express pour faire confiance au proxy (pour obtenir la vraie IP)
// Nécessaire si derrière Nginx, Cloudflare, etc.
app.set('trust proxy', true);

// Simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Node.js JWT Authentication application." });
});

// Routes API (avec /api prefix)
app.use("/api/auth", authRoutes);
app.use("/api/test", userRoutes);
app.use("/api/link", linkRoutes);

// Routes de redirection publiques
app.use("/", redirectRoutes);

// Middleware 404 global - Doit être en dernier
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});

// Set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});