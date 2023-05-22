import { Category } from "@/models/Category";
import { connectToDB } from "@/utils/database";

export const DELETE = async (req, { params }) => {
  try {
    connectToDB();
    await Category.findOneAndDelete({ _id: params.id });
  } catch (error) {
    return new Response({ status: 500 });
  }
};
