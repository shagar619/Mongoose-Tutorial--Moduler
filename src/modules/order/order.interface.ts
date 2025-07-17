import { Model, Types } from "mongoose";

interface IAddress {
    city: string,
    street: string,
    zip: number
}


export interface IOrder {
    user: Types.ObjectId,
    mango: Types.ObjectId,
    quantity: number,
    totalPrice: number,
    status: string,
    address: IAddress
}


export interface IOrderMethods {

    // for instance methods
    checkStock(id: string): Promise<any>
}

export interface IOrderModel extends Model<IOrder, {}, IOrderMethods>{
    
    // for static methods
    checkStock(id: string, quantity: number): Promise<any>
}