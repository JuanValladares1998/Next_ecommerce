import { Product } from "@/models/Product";

export const DELETE = async (req, { params }) => {
  try {
    await Product.findOneAndDelete({ _id: params.id });
  } catch (error) {
    return new Response({ status: 500 });
  }
};
