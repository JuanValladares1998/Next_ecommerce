import User from "@/models/user";

export const GET = async (req) => {
  try {
    const users = await User.find();
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response("Error al obtener los usuarios", { status: 500 });
  }
};
