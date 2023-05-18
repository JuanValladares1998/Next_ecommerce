import { Product } from "@/models/Product";

export const GET = async (req) => {
  try {
    const products = await Product.find();
    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    return new Response({ status: 500 });
  }
};
