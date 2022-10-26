import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    discription: { type: String, required: true },
    isVeg: { type: Boolean, required: true },
    isContainEgg: { type: Boolean, required: true },
    catagory: { type: String, required: true },
    photos: {
      type: mongoose.Types.ObjectId,
      ref: "images",
    },
    price: { type: Number, default: 100, required: true },
    oddOn: [{ type: mongoose.Types.ObjectId, ref: "foods" }],
    restaurant: {
      type: mongoose.Types.ObjectId,
      ref: "restaurants",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const FoodModel = mongoose.model("foods", FoodSchema);
