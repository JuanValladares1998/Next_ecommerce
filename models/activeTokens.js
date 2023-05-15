import { Schema, model, models } from "mongoose";

const TokenSchema = new Schema({
  token: {
    type: String,
    unique: true,
    required: true,
  },
});

const activeToken = models.activeToken || model("activeToken", TokenSchema);

export default activeToken;
