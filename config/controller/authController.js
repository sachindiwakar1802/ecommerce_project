import User from "../../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { genToken } from "../token.js";
/* ================= REGISTER ================= */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if user already exists
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter valid email" });
    }
    // Validate password
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }
    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);
    // Create user
    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });
    // Generate token
    const token = genToken(user._id);
    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message: "Registration successful",
    });
  } catch (error) {
    console.log("Register error:", error);
    return res.status(500).json({ message: "Register error" });
  }
};
/* ================= LOGIN ================= */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }
    const token = genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // fixed to 7 days
    });
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message: "Login successful",
    });
  } catch (error) {
    console.log("Login error:", error);
    return res.status(500).json({ message: "Login error" });
  }
};// ================= LOGOUT =================

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "Strict",
    });

    return res.status(200).json({
      message: "Logout successful",
    });

  } catch (error) {
    console.log("Logout Error:", error);
    return res.status(500).json({
      message: `Logout error: ${error.message}`,
    });
  }
};


export const googleLogin = async (req,res) =>{
  try {
    let {name,email} = 
  } catch (error) {
    
  }
}