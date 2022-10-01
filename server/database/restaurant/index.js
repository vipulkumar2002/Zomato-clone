import mongoose from "mongoose";

const RestuarantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    cuisine: [String],
    restaurantTiming: String,
    contactNum: Number,
    webside: String,
    populerDishes: [String],
    averageCast: Number,
    amenties: [String],
    menuImages: {
      type: mongoose.Types.ObjectId,
      ref: "menus",
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "reviews",
      },
    ],
    photos: { type: mongoose.Types.ObjectId, ref: "images" },
  },
  {
    timestamps: true,
  }
);

export const RestuarantModel = mongoose.model("restuarants", RestuarantSchema);
