import pool from '../config/dbConfig.js';
import dotenv from 'dotenv';
dotenv.config();

const getAllLinks = async () => {
    try {
        const result = await pool.query('SELECT * FROM links');
        return result.rows;
    } catch (err) {
        console.error("Erreur BDD:", err);
        throw err;
    }
};

export default {
    getAllLinks,
};
