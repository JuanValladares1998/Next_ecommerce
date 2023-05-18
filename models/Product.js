const { Schema, model, models } = require("mongoose");

const ProductSchema = new Schema({
  title: { type: String, required: false },
  description: String,
  price: { type: Number, required: false },
  images: [{ type: String }],
  category: { type: String, required: false },
  subCategory: { type: String, required: false },
});

export const Product = models.Product || model("Product", ProductSchema);
