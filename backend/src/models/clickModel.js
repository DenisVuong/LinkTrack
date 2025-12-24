import pool from '../config/dbConfig.js';
import dotenv from 'dotenv';
dotenv.config();

const insertClick = async (linkId, ipAddress, userAgent, referer) => {
    const query = `
        INSERT INTO clicks (link_id, ip_address, user_agent, referer) 
        VALUES ($1, $2, $3, $4) 
        RETURNING *
    `;

    try {
        const result = await pool.query(query, [linkId, ipAddress, userAgent, referer]);
        return result.rows[0];
    } catch (err) {
        throw err;
    }

};

const getClicksByLinkId = async (linkId) => {
    const query = `
        SELECT * FROM clicks WHERE link_id = $1 ORDER BY created_at DESC;
    `;

    try {
        const result = await pool.query(query, [linkId]);
        return result.rows;
    } catch (err) {
        throw err;
    }

};

const getClicksByUserId = async (userId) => {
    const query = `
        SELECT clicks.* FROM clicks 
        JOIN links ON clicks.link_id = links.id
        WHERE links.user_id = $1
        ORDER BY clicks.created_at DESC;
    `;

    try {
        const result = await pool.query(query, [userId]);
        return result.rows;
    } catch (err) {
        throw err;
    }

};

const getClickStats = async (linkId) => {
    const query = `
        SELECT 
            COUNT(*) as total_clicks,
            COUNT(DISTINCT ip_address) as unique_clicks,
            json_agg(DISTINCT user_agent) FILTER (WHERE user_agent IS NOT NULL) as user_agents,
            json_agg(DISTINCT referer) FILTER (WHERE referer IS NOT NULL) as referers,
            json_agg(DISTINCT ip_address) FILTER (WHERE ip_address IS NOT NULL) as ip_addresses,
            MIN(created_at) as first_click,
            MAX(created_at) as last_click
        FROM clicks
        WHERE link_id = $1;
    `;

    try {
        const result = await pool.query(query, [linkId]);
        return result.rows[0];
    } catch (err) {
        throw err;
    }

};

export { insertClick, getClicksByLinkId, getClicksByUserId, getClickStats };