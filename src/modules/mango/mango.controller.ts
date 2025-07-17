import { Request, Response } from "express";
import Mango from "./mango.model";


const CreateMango = async (req: Request, res: Response) => {

    try {

        const data = await Mango.create(req.body);

        res.status(201).json({
        success: true,
        message: "Mango created successfully!",
        data
    });

    } catch(error: any){
        res.status(400).json({
            success: false,
            message: error.message,
            error
        });
    };
};



const getMangos = async (req: Request, res: Response) => {

    try{

        const data = await Mango.find();
        
        res.status(201).json({
        success: true,
        message: "All Mango find successfully!",
        data
    });
    } catch(error: any){
        res.status(400).json({
            success: false,
            message: error.message,
            error
        });
    };
};



const getMangoById = async(req: Request, res: Response) => {

    try {

        const mangoId = req.params.mangoId;
        const data = await Mango.findById(mangoId);

        res.status(201).json({
        success: true,
        message: "Single Mango find successfully!",
        data
    });
    } catch(error: any){
        res.status(400).json({
            success: false,
            message: error.message,
            error
        });
    };
};



const updateMango = async (req: Request, res: Response) => {

    try{

        const mangoId = req.params.mangoId;
        const data = await Mango.findByIdAndUpdate(mangoId, req.body, {
            new: true,
            runValidators: true
        });
        res.status(201).json({
        success: true,
        message: "Single Mango find successfully!",
        data
    });
    } catch(error: any){
        res.status(400).json({
            success: false,
            message: error.message,
            error
        });
    };
};



const deleteMangoById = async (req: Request, res: Response) => {
    try{

        const mangoId = req.params.mangoId;
        const data = await Mango.findByIdAndDelete(mangoId);

        res.status(201).json({
        success: true,
        message: "Single Mango find successfully!",
        data
    });
    }catch(error: any){
        res.status(400).json({
            success: false,
            message: error.message,
            error
        });
    };
};





export const mangoController = {
    CreateMango,
    getMangos,
    getMangoById,
    updateMango,
    deleteMangoById
}