import pool from '../config/dbConfig.js';
import dotenv from 'dotenv';
dotenv.config();

const getAllLinks = async (user_id) => {
    const query = 'SELECT * FROM links WHERE user_id = $1';
    try {
        const result = await pool.query(query, [user_id]);
        return result.rows;
    } catch (err) {
        throw err;
    }
};



const getNextId = async () => {
    const query = "SELECT nextval('links_id_seq') AS next_id";
    try {
        const result = await pool.query(query)
        return parseInt(result.rows[0].next_id, 10);
    } catch (err) {
        throw err;
    }
}
const insertLink = async (id, userId, original_url, short_code) => {
    const query = `
        INSERT INTO links (id, user_id, original_url, short_code) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *
    `;

    try {
        const result = await pool.query(query, [id, userId, original_url, short_code]);
        return result.rows[0];
    } catch (err) {
        throw err;
    }

}

const deleteLink = async (id, userId) => {
    const query = `DELETE FROM links WHERE id = $1 AND user_id = $2 RETURNING *`;
    try {
        const result = await pool.query(query, [id, userId]);
        return result.rows[0];
    } catch (err) {
        throw err;
    }
}

const doesUrlExist = async (url) => {
    const query = `SELECT * FROM links WHERE original_url = $1;`;
    try {
        const result = await pool.query(query, [url]);
        return result.rows[0];

    } catch (err) {
        throw err;
    }
}

const getLinkById = async (id) => {
    const query = `SELECT * FROM links WHERE id = $1;`;
    try {
        const result = await pool.query(query, [id]);
        return result.rows[0];
    } catch (err) {
        throw err;
    }
}

export default {
    getAllLinks,

    getNextId,
    insertLink,
    deleteLink,
    doesUrlExist,
    getLinkById,
};
