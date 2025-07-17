import { model, Schema } from "mongoose";


const addressSchema = new Schema<IAddress>({
    city: { type: String },
    street: { type: String },
    zip: { type: Number }
},
    {
        _id: false
    }
);


const userSchema = new Schema<IUser>({
    name: { 
        type: String, 
        required: true, 
        trim: true, 
        min: 3, 
        max: 255 
    },

    email: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
        },
            message: (props) => `${props.value} is not a valid email`,
        },
        immutable: true,
        lowercase: true,
        unique: true
    },

    phone: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^(?:\+?88)?01[3-9]\d{8}$/.test(v);
        },
            message: props => `${props.value} is not a valid Bangladeshi phone number!`
        },
        unique: true,
    },

    password: { 
        type: String, 
        required: true,
        validate: {
            validator: function(v) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/.test(v);
            },
            message: props => `Password is too weak. Must contain upper/lowercase letters, a number, and a special character.`
        }
    },

    address: {
        type: addressSchema
    },

    role: {
        type: String,
        enum: {
            values: ["Admin", "Customer"],
            message: "{VALUE} is not acceptable",
        },
        required: true,
        default: "Customer"
    }
},

    {
        versionKey: false,
        timestamps: true
    }
);


const User = model<IUser>("User", userSchema);

export default User;