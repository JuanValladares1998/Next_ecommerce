import { SubCategory } from "@/models/SubCategory";
import { connectToDB } from "@/utils/database";

export const DELETE = async (req, { params }) => {
  try {
    connectToDB();
    await SubCategory.findOneAndDelete({ _id: params.id });
  } catch (error) {
    return new Response({ status: 500 });
  }
};
