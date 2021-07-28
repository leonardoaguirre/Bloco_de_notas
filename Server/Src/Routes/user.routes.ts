import { Router } from "express";
import {UserControl} from "../Controllers/UserControl";

const userRoutes = Router();
const userControl = new UserControl();

userRoutes.post('/Insert', userControl.insert)
userRoutes.post('/Login',userControl.login)


export {userRoutes};