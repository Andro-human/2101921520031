import mongoose, { Schema, Model } from "mongoose";

export interface IProduct {
  productName: string;
  price: number;
  rating: number;
  discount: number;
  availability: string;
}

const productSchema: Schema<IProduct> = new Schema<IProduct>(
  {
    productName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    availability: {
      type: String,
      required: true,
      enum: ["yes", "out-of-stock"],
    },
  },
  { timestamps: true }
);

productSchema.index({ productName: 1, price: 1, rating: 1 }, { unique: true });

const productModel: Model<IProduct> = mongoose.model<IProduct>(
  "products",
  productSchema
);

export default productModel;
