import User from "../models/usersModel.js";
import Role from "../models/roleModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // 1. Hash du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // 2. Création de l'utilisateur
        // Attention: createUser attend un objet {username, email, password}
        // On passe le mot de passe HASHÉ
        const user = await User.createUser({
            username,
            email,
            password: hashedPassword
        });

        // 3. Attribution du rôle "user" par défaut
        const role = await Role.findRoleByName("user");
        if (role) {
            await Role.addUserRole(user.id, role.id);
        }

        res.status(201).json({ message: "User registered successfully!" });
    } catch (err) {
        console.error('Error during signup:', err);
        res.status(500).json({ message: "An error occurred during registration" });
    }
};

export const signin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // 1. Trouver l'utilisateur
        const user = await User.findUserByUsername(username);
        if (!user) {
            return res.status(404).json({ message: "User Not Found." });
        }

        // 2. Vérifier le mot de passe
        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        // 3. Générer le token JWT
        const secret = process.env.JWT_SECRET || 'secret-key';
        const token = jwt.sign({ id: user.id }, secret, {
            expiresIn: 86400 // 24 heures
        });

        // 4. Récupérer les rôles
        // getUserRoles retourne un tableau de strings ['admin', 'user']
        const roles = await User.getUserRoles(user.id);
        const authorities = roles.map((role) => `ROLE_${role.toUpperCase()}`);

        res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token,
        });
    } catch (err) {
        console.error('Error during signin:', err);
        res.status(500).json({ message: "An error occurred during login" });
    }
}
