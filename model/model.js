import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"]
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: [true, "This email is already taken."]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minLength: [6, "Password must be 6 chracters long"]
    },
    cpass: {
        type: String,
        required: [true, "Please provide a password"],
        minLength: [6, "Password must be 6 chracters long"]
    },
    isvalid: {
        type: Boolean,
        default: false
    },
    verifyToken: String,
    verifyTokenExpiry: Date,
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
}, {timestamps: true})

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User