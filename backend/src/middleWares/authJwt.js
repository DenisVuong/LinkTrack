import jwt from "jsonwebtoken";
import User from "../models/usersModel.js";
import dotenv from "dotenv";
dotenv.config();

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"];

    if (!token) {
        return res.status(403).json({ message: "No token provided!" });
    }

    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
    }

    // Use JWT_SECRET from env, fallback to 'secret' for dev if not set (but better to rely on env)
    const secret = process.env.JWT_SECRET || 'secret-key';

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Unauthorized!" });
        }
        req.user = { userId: decoded.id };
        next();
    })
};

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findUserById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const roles = await User.getUserRoles(req.user.userId);

        if (roles.includes("admin")) {
            return next();
        }

        return res.status(403).json({ message: "Require Admin Role!" });
    } catch (error) {
        return res.status(500).json({ message: "Unable to validate User role!" });
    }
};

const isModerator = async (req, res, next) => {
    try {
        const user = await User.findUserById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const roles = await User.getUserRoles(req.user.userId);

        if (roles.includes("moderator")) {
            return next();
        }

        return res.status(403).json({ message: "Require Moderator Role!" });
    } catch (error) {
        return res.status(500).json({ message: "Unable to validate User role!" });
    }
};

const isModeratorOrAdmin = async (req, res, next) => {
    try {
        const user = await User.findUserById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const roles = await User.getUserRoles(req.user.userId);

        if (roles.includes("moderator") || roles.includes("admin")) {
            return next();
        }

        return res.status(403).json({ message: "Require Moderator or Admin Role!" });
    } catch (error) {
        return res.status(500).json({ message: "Unable to validate User role!" });
    }
};

const authJwt = {
    verifyToken,
    isAdmin,
    isModerator,
    isModeratorOrAdmin
};

export default authJwt;