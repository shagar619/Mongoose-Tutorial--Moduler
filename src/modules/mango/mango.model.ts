import { model, Schema } from "mongoose";
import { IMango } from "./mango.interface";


const mangoSchema = new Schema<IMango>({
    name: {
        type: String,
        trim: true,
        required: true
    },

    variety: {
        type: String,
        trim: true,
        required: true
    },

    unit: {
        type: String,
        enum: {
            values: ["TON", "KG"],
            message: "{VALUE} is not acceptable"
        },
        required: true,
        default: "KG"
    },

    price: {
        type: Number,
        min: 0,
        required: true
    },

    stock: {
        type: Number,
        min: 0,
        required: true
    },

    origin: {
        type: String,
        default: "Unknown"
    },

    season: {
        type: String,
        enum: {
            values: ["Summer", "Winter"],
            message: "{VALUE} is not acceptable."
        }
    }
},
    {
        timestamps: true,
        versionKey: false
    }
);


const Mango = model<IMango>("Mango", mangoSchema);
export default Mango;