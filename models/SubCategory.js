const { Schema, model, models, default: mongoose } = require("mongoose");

const SubCateogrySchema = new Schema({
  name: { type: String, required: true },
  parent: { type: mongoose.Types.ObjectId, ref: "Category", required: false },
});

export const SubCategory = models?.SubCategory || model("SubCategory", SubCateogrySchema);