import activeToken from "@/models/activeTokens";
import regEmail from "@/models/regEmails";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import jwt from "jsonwebtoken";

export const POST = async (req, { params }) => {
  const token = params.token;
  connectToDB();
  const actToken = await activeToken.findOne({ token: token });
  if (!actToken) return new Response("Token no válido", { status: 500 });
  if (!token) return new Response("Token no válido", { status: 500 });
  jwt.verify(token, process.env.SECRET_KEY, async (error, user) => {
    if (error) return new Response("Token no válido", { status: 500 });
    await connectToDB();
    const { name, password, email } = user;
    await User.create({ name, email, password });
    await regEmail.deleteOne({ email });
    await activeToken.deleteOne({ token: token });

    console.log("Nuevo usuario creado: " + name);
    return new Response("Confirmación de cuenta exitosa", { status: 200 });
  });
};
