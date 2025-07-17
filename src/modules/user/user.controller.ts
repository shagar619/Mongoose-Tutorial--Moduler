import { Request, Response } from "express";
import User from "./user.model";


const registerUser = async(req: Request, res: Response) => {

try {

    const payload = req.body;
    const user = new User(payload);

    const data = await user.save();

    res.status(201).json({
        success: true,
        message: "User created successfully!",
        data
    });
    } catch(error: any){
        res.status(400).json({
            success: false,
            message: error.message,
            error
        });
    }
};



const getUsers = async (req: Request, res: Response) => {

    const data = await User.find();

    res.status(201).json({
        success: true,
        message: "Find all users successfully!",
        data
    });
};

export { registerUser, getUsers };