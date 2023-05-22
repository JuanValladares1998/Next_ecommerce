import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const GET = async (req) => {
  try {
    connectToDB();
    const users = await User.find();
    if (!users) return new Response({ status: 500 });
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response("Error al obtener los usuarios", { status: 500 });
  }
};
