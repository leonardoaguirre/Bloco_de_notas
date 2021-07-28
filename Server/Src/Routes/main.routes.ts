import { Router } from "express";
import { userRoutes } from "./user.routes";
import { noteRoutes } from "./note.routes";

const routes = Router();

routes.use('/User',userRoutes);
routes.use('/Note',noteRoutes);

export {routes};