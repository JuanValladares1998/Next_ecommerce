import { Schema, model, models } from "mongoose";
// import bcrypt from "bcryptjs";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email ya existe!"],
    required: [true, "Email es requerido!"],
  },
  name: {
    type: String,
    required: [true, "Username es requerido!"],
  },
  image: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "user",
  },
});

// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }
//   this.password = await bcrypt.hash(this.password, 10);
// });

const User = models.User || model("User", UserSchema);

export default User;
