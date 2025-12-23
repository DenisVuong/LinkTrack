import pool from '../config/dbConfig.js';
import dotenv from 'dotenv';
dotenv.config();

const insertClick = async (linkId, ipAdress, userAgent, referer) => {
    const query = `
        INSERT INTO clicks (link_id, ip_adress, user_agent, referer) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *
    `;

    try {
        const result = await pool.query(query, [linkId, ipAdress, userAgent, referer]);
        return result.rows[0];
    } catch (err) {
        throw err;
    }

};

const getClicksByLinkId = async (linkId) => {
    const query = `
        SELECT * FROM clicks WHERE link_id = $1;
    `;

    try {
        const result = await pool.query(query, [linkId]);
        return result.rows[0];
    } catch (err) {
        throw err;
    }

};

const getClicksByUserId = async (userId) => {
    const query = `
    `;

    try {
        const result = await pool.query(query, [userId]);
        return result.rows[0];
    } catch (err) {
        throw err;
    }

}

const getClickStats = async (linkId) => {
    const query = `
        
    `;

    try {
        const result = await pool.query(query, []);
        return result.rows[0];
    } catch (err) {
        throw err;
    }

}