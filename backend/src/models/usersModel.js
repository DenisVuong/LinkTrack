import pool from '../config/dbConfig.js';

const createUser = async (user) => {
    const { username, email, password } = user;
    const query = `
        INSERT INTO users(username, email, password)
        VALUES($1, $2, $3)
        RETURNING *;`;
    const values = [username, email, password];

    try {
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (err) {
        throw err;
    }
};

const findUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = $1';

    try {
        const result = await pool.query(query, [email]);
        return result.rows[0];
    } catch (err) {
        throw err;
    }
};

const findUserByUsername = async (username) => {
    const query = 'SELECT * FROM users WHERE username = $1';

    try {
        const result = await pool.query(query, [username]);
        return result.rows[0];
    } catch (err) {
        throw err;
    }
};

const findUserById = async (id) => {
    const query = 'SELECT * FROM users WHERE id = $1';

    try {
        const result = await pool.query(query, [id]);
        return result.rows[0];
    } catch (err) {
        throw err;
    }
};

const getUserRoles = async (userId) => {
    const query = `
        SELECT r.name
        FROM roles r
        JOIN user_roles ur ON r.id = ur.role_id
        WHERE ur.user_id = $1
    `;

    try {
        const result = await pool.query(query, [userId]);
        return result.rows.map(row => row.name);
    } catch (err) {
        throw err;
    }
}

export default {
    createUser,
    findUserByEmail,
    findUserByUsername,
    findUserById,
    getUserRoles
};
