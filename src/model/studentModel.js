import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: {
    type: String,
    unique: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },

  forgotPasswordToken: String,
  forgotPasswordExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
  verifyOtp: Number,
  verifyOtpExpiry: Date
},
{timestamps: true}
);

const Student = mongoose.models.students || mongoose.model("students", studentSchema);
export default Student;