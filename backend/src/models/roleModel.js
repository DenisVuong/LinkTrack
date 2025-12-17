import pool from '../config/dbConfig.js';

const createRole = async (name) => {
    const query = 'INSERT INTO roles (name) VALUES ($1) RETURNING *';

    try {
        const result = await pool.query(query, [name]);
        return result.rows[0];
    } catch (err) {
        throw err;
    }
};

const findRoleByName = async (name) => {
    const query = 'SELECT * FROM roles WHERE name = $1';

    try {
        const result = await pool.query(query, [name]);
        return result.rows[0];
    } catch (err) {
        throw err;
    }
};


const addUserRole = async (userId, roleId) => {
    const query = 'INSERT INTO user_roles (user_id, role_id) VALUES ($1, $2) RETURNING *';

    try {
        const result = await pool.query(query, [userId, roleId]);
        return result.rows[0];
    } catch (err) {
        throw err;
    }
};

export default {
    createRole,
    findRoleByName,
    addUserRole
};
