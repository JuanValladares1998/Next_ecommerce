import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const POST = async (req) => {
  await connectToDB();
  const { name, email, password } = await req.json();
  const newUser = User.create({ name, email, password });
  return new Response(JSON.stringify({ newUser }), { status: 201 });
};
