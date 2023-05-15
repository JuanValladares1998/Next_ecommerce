import { Schema, model, models } from "mongoose";

const Regemail = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
});

const regEmail = models.regEmail || model("regEmail", Regemail);

export default regEmail;
