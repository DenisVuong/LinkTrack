const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.DB_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.DB_PORT,
});



app.get('/', async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM users;`);
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