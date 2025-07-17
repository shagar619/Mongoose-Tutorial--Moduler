import { model, Schema } from "mongoose";
import { IOrder, IOrderMethods, IOrderModel } from "./order.interface";
import Mango from "../mango/mango.model";


const addressSchema = new Schema<IAddress>({
    city: { type: String },
    street: { type: String },
    zip: { type: Number }
},
    {
        _id: false
    }
);


const orderSchema = new Schema<IOrder, IOrderModel, IOrderMethods>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    mango: {
        type: Schema.Types.ObjectId,
        ref: "Mango",
        required: true
    },

    quantity: {
        type: Number,
        min: 0,
        required: true
    },

    totalPrice: {
        type: Number,
        min: 0
    },

    address: {
        type: addressSchema
    },

    status: {
        type: String,
        required: true
    }
},
    {
        versionKey: false,
        timestamps: true,
        // toJSON: { virtuals: true },
        // toObject: { virtuals: true }
    }
);



// calculate total price before saving the order
orderSchema.pre("save", async function () {
    console.log("doc from pre"+ this);

    const mango = await Mango.findById(this.mango);

    if(!mango) throw new Error("Mango not found!");

    this.totalPrice = mango.price * this.quantity;
});






// orderSchema.post("save", function (doc, next) {

//     console.log("doc from post " + doc);

//     const plainAddress =
//         doc.address.street +
//         " " +
//         doc.address.city +
//         " " +
//         doc.address.zip 

//     doc.address = { ...doc.address, plainAddress };

//     console.log({ doc });

//     next();
// });





// static method to check stock
// orderSchema.static("checkStock", async function checkStock(id: string, quantity: number, res: any) {

//     const mango = await Mango.findById(id);

//     if (!mango) throw new Error("Mango not found!");

//     if (mango.stock < quantity) {
//         throw new Error("Not enough stock available!");
//     }
//     return true;
// });



// Awesome customize handling of errors
orderSchema.static("checkStock", async function checkStock(id: string, quantity: number, res: any) {
    const mango = await Mango.findById(id);

    if (!mango) {
        const error = new Error("The requested mango item could not be found.");
        (error as any).statusCode = 404;
        throw error;
    }

    if (mango.stock < quantity) {
        const error = new Error(`Insufficient stock: only ${mango.stock} item(s) available.`);
        (error as any).statusCode = 400;
        throw error;
    }

    return true;
});










// instance method to check stock
orderSchema.method("checkStock", async function checkStock() {

    const order = this as IOrder;
    const mango = await Mango.findById(order.mango);

    if (!mango) throw new Error("Mango not found!");
    if (mango.stock < order.quantity) {
        throw new Error("Not enough stock available!");
    }
    return true;
});



const Order = model<IOrder, IOrderModel>("Order", orderSchema);
export default Order;