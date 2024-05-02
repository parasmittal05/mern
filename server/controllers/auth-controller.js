const User = require('../models/user-model');
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
    try {
        res.status(200).send("Welcome back to home page");
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
};

const register = async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, phone, password } = req.body;

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const saltRound = 10;
        const hash_password = await bcrypt.hash(password, saltRound);
        const userCreated = await User.create({
            username,
            email,
            phone,
            password: hash_password
        });

        res.status(201).json({
            msg: "Registration successful",
            token: await userCreated.generateToken(), // Corrected spelling here
            userId: userCreated._id.toString(),
        });
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal server error");
    }
};

// user login
const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });
        console.log(userExist);
        if (!userExist) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, userExist.password);
        if (isPasswordValid) {
            res.status(200).json({
                msg: "Login successful",
                token: await userExist.generateToken(), // Corrected spelling here
                userId: userExist._id.toString(),
            });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.error(error);
      //  res.status(500).json("Internal server error");
        next(error);
    }
};

const user = async(req,res)=>{
    try {
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({userData});
    } catch (error) {
        console.log("error from user root")
    }

}

module.exports = { home, register, logIn, user };
