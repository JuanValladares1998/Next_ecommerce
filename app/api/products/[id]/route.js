import { Product } from "@/models/Product";
import { connectToDB } from "@/utils/database";

export const GET = async (req, { params }) => {
  try {
    connectToDB();
    const product = await Product.findById(params.id);
    if (!product) return new Response({ status: 500 });
    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new Response({ status: 500 });
  }
};
