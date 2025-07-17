import { Request, Response } from "express";
import Order from "./order.model";


const createOrder = async (req: Request, res: Response) => {

    try{

        const checkStock = await Order.checkStock(
            req.body.mango as string,
            req.body.quantity
        );

        if (!checkStock) {
            return res.status(400).json({
                success: false,
                message: "Not enough stock available!"
            });
        };

        const order = await Order.create(req.body);




        res.status(201).json({
        success: true,
        message: "Order completed successfully!",
        order
    });


    }catch(error: any){
        res.status(400).json({
            success: false,
            message: error.message,
            error
        });
    };
};



const getOrders = async (req: Request, res:Response) => {

    try {

        const order = await Order.find();
        
        res.status(201).json({
        success: true,
        message: "All orders find successfully!",
        data: order
    });
    }catch(error: any){
        res.status(400).json({
            success: false,
            message: error.message,
            error
        });
    };
};



export const orderController = {
    createOrder,
    getOrders
};