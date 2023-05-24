import { Product } from "@/models/Product";
import { connectToDB } from "@/utils/database";

export const DELETE = async (req, { params }) => {
  try {
    connectToDB();
    await Product.findOneAndDelete({ _id: params.id });
    return new Response("Producto eliminado", { status: 200 });
  } catch (error) {
    return new Response({ status: 500 });
  }
};
