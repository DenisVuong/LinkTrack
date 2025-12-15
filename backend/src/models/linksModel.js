const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.DB_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.DB_PORT,
});

const getAllLinks = async () => {
    try {
        const result = await pool.query('SELECT * FROM links');
        return result.rows;
    }catch (err) {
        console.error("Erreur BDD:", err);
        res.status(500).json({ error: "Erreur serveur" });
    }
};


