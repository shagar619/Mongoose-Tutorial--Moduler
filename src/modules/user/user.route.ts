import { Router } from "express";
import { getUsers, registerUser } from "./user.controller";


const userRoute = Router();

userRoute.post("/", registerUser);
userRoute.get("/", getUsers);

export default userRoute;