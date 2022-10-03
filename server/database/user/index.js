import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please enter your full name !"],
      maxLength: [20, "Name cann't exceed 20 character !"],
      minLength: [3, "Name should have atleat 3 character !"],
    },
    email: { type: String, required: true },
    password: {
      type: String,
      default: "Please Enter your password !",
      maxLength: [16, "Password cann't exceed 16 character !"],
      minLength: [6, "Name should have atleat 6 character !"],
    },
    address: [{ detail: { type: String }, for: { type: String } }],
    phoneNumber: [
      {
        type: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Attachments
UserSchema.methods.generateJwtToken = function () {
  return jwt.sign({ user: this._id.toString() }, "ZomatoClone");
};

//helper function
UserSchema.statics.findByEmailAndPhone = async ({ email, phoneNumber }) => {
  const checkUserByEmail = await UserModel.findOne({ email });
  const checkUserByPhone = await UserModel.findOne({ phoneNumber });

  if (checkUserByEmail || checkUserByPhone) {
    throw new Error("User Already Exists ...!");
  }

  return false;
};

UserSchema.statics.findByEmailAndPassword = async ({ email, password }) => {
  const user = await UserModel.findOne({ email });

  if (!user) throw new Error("User does not Exits ... !!");

  // Campare Password
  const doesPasswordMatch = await bcrypt.compare(password, user.password);
  if (!doesPasswordMatch) throw new Error("Invalid Credentials ..!!!");
  return user;
};

//data Encription function
UserSchema.pre("save", function (next) {
  const user = this;

  //password is Modified
  if (!user.isModified("password")) return next();

  //generate bcrypt salt
  bcrypt.genSalt(8, (error, salt) => {
    if (error) return next(error);

    //hash tha password
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);

      //assign hashed password
      user.password = hash;
      return next();
    });
  });
});

export const UserModel = mongoose.model("users", UserSchema);
