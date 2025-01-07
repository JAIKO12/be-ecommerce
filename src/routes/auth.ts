import { Router } from "express";
import { login, signUp } from "../controllers/auth";

const  authRoutes = Router();

authRoutes.post('/register', signUp)
authRoutes.post('/login', login)


export default authRoutes