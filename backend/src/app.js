import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './config/dbConfig.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM links; `);
        console.log("Ca marche");
        res.json(result.rows);
    } catch (err) {
        console.error("Erreur BDD:", err);
        res.status(500).json({ error: "Erreur serveur" });
    }
})

app.listen(3000, () => {
    console.log("Serveur démarré sur http://localhost:3000");
})