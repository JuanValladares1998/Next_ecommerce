import { Category } from "@/models/Category";
import { connectToDB } from "@/utils/database";

export const GET = async (req) => {
  try {
    connectToDB();
    const categories = await Category.find();
    if (!categories) return new Response({ status: 500 });
    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (err) {
    return new Response({ status: 500 });
  }
};
