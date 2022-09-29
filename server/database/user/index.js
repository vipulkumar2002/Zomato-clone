import mongoose, { model } from "mongoose";

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Please enter your full name !"],
    maxLength: [20, "Name cann't exceed 20 character !"],
    minLength: [3, "Name should have atleat 3 character !"],
  },
  password: {
    type: String,
    required: [true, "Please Enter your password !"],
    maxLength: [16, "Password cann't exceed 16 character !"],
    minLength: [6, "Name should have atleat 6 character !"],
  },
  address: [{ detail: { type: String }, for: { type: String } }],
  phoneNum: [
    {
      type: Number,
    },
  ],
});

module.exports = mongoose.model("Users", UserSchema);
