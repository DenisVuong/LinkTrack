import Role from "../models/roleModel.js";
import User from "../models/usersModel.js";

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        // Verifie si l'username existe
        let user = await User.findUserByUsername(req.body.username);
        if (user) {
            return res.status(400).json({ message: "Failed! Username is already in use!" });
        }

        // Verifie si l'email existe
        user = await User.findUserByEmail(req.body.email);
        if (user) {
            return res.status(400).json({ message: "Failed! Email is already in use!" });
        }

        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

const checkRolesExisted = async (req, res, next) => {
    if (req.body.roles) {
        for (const role of req.body.roles) {
            const roleExists = await Role.findRoleByName(role);
            if (!roleExists) {
                return res.status(400).json({ message: `Failed! Role does not exist: ${role}` });
            }
        }
    }
    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRolesExisted,
};

export default verifySignUp;