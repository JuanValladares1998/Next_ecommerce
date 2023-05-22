import { Product } from "@/models/Product";
import { connectToDB } from "@/utils/database";

export const DELETE = async (req, { params }) => {
  try {
    connectToDB();
    await Product.findOneAndDelete({ _id: params.id });
  } catch (error) {
    return new Response({ status: 500 });
  }
};
