import { Product } from "@/models/Product";

export const GET = async (req, { params }) => {
  try {
    const product = await Product.findById(params.id);
    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new Response({ status: 500 });
  }
};
