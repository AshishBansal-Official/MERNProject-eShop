import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import { comparePassword, hashPassword } from "../utils/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        // Validation
        if (!name) {
            return res.send({
                message: "Name is Required",
            });
        }
        if (!email) {
            return res.send({
                message: "Email is Required",
            });
        }
        if (!password) {
            return res.send({
                message: "Password is Required",
            });
        }
        if (!phone) {
            return res.send({
                message: "Phone is Required",
            });
        }
        if (!address) {
            return res.send({
                message: "Address is Required",
            });
        }

        // Check user
        const existingUser = await userModel.findOne({ email });

        // Existing user
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Already Registered Please Login",
            });
        }

        // Register user
        const hashedPassword = await hashPassword(password);

        // Save
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
        }).save();

        res.status(201).send({
            success: true,
            message: "User Registered Successfully",
            user,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Registeration",
            error,
        });
    }
};

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            });
        }

        // Check user
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered",
            });
        }

        // Register user
        const match = await comparePassword(password, user.password);

        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            });
        }

        // Token
        const token = await JWT.sign(
            { _id: user._id },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "7d",
            }
        );

        res.status(200).send({
            success: true,
            message: "Login Successful",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error,
        });
    }
};

export const testController = (req, res) => {
    res.send("Protected Route");
};

// Update Profile
export const updateProfileController = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body;
        const user = await userModel.findById(req.user._id);
        // Password
        if (password && password.length < 6) {
            return res.json({
                error: "Passsword is required and 6 character long",
            });
        }
        const hashedPassword = password
            ? await hashPassword(password)
            : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(
            req.user._id,
            {
                name: name || user.name,
                password: hashedPassword || user.password,
                phone: phone || user.phone,
                address: address || user.address,
            },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Profile Updated Successfully",
            updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error While Updating Profile",
            error,
        });
    }
};

// Orders
export const getOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({ buyer: req.user._id })
            .populate("products", "-photo")
            .populate("buyer", "name");
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting orders",
            error,
        });
    }
};
