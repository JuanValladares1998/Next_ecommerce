const { Schema, model, models, default: mongoose } = require("mongoose");

const CateogrySchema = new Schema({
  name: { type: String, required: true, unique: true },
});

export const Category = models?.Category || model("Category", CateogrySchema);
