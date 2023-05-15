import { Schema, model, models } from "mongoose";

const DisAccount = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
});

const disAccount = models.disAccount || model("disAccount", DisAccount);

export default disAccount;
