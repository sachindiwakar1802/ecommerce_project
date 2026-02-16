import express from "express"

import { login, logout, register,googleLogin } from "../config/controller/authController.js"

const authRoute = express.Router()

authRoute.post("/register",register)
authRoute.post("/login",login)
authRoute.get("/logout",logout)


authRoute.post("/googlelogin",googleLogin)

export default authRoute