import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import activeToken from "@/models/activeTokens";

export const POST = async (req, { params }) => {
  const token = params.token;
  const { password } = await req.json();

  if (!token) return new Response("Token no válido", { status: 500 });

  connectToDB();
  const actToken = await activeToken.findOne({ token: token });
  if (!actToken) return new Response("Token no válido", { status: 500 });

  jwt.verify(token, process.env.SECRET_KEY, async (error, user) => {
    if (error) return new Response("Token no válido", { status: 500 });
    const { email } = user;
    const hashedPassword = await bcrypt.hash(password, 10);

    const findUser = await User.findOneAndUpdate(
      { email: email },
      { password: hashedPassword }
    );
    if (!findUser)
      return new Response("Error al actualizar contraseña", { status: 500 });
    console.log("Contraseña actualizada del usuario: " + findUser.name);
    await activeToken.deleteOne({ token: token });
    return new Response("Contraseña actualizada", { status: 200 });
  });
};
