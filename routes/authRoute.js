import express from "express"

import { login, logout, register } from "../config/controller/authController.js"

const authRoute = express.Router()

authRoute.post("/register",register)
authRoute.post("/login",login)
authRoute.get("/logout",logout)
export default authRoute