import { Product } from "@/models/Product";
import { connectToDB } from "@/utils/database";

export const GET = async (req) => {
  try {
    connectToDB();
    const products = await Product.find();
    if (!products) return new Response({ status: 500 });
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response({ status: 500 });
  }
};
