import  { Router } from "express";
import authRoutes from "./auth";

const routeRouter = Router();

routeRouter.use('/auth', authRoutes)

export default routeRouter