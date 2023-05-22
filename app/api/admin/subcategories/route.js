import { SubCategory } from "@/models/SubCategory";
import { connectToDB } from "@/utils/database";

export const POST = async (req) => {
  try {
    const { subname: name, parent } = await req.json();
    connectToDB();
    await SubCategory.create({ name, parent });
    return new Response({ status: 200 });
  } catch (error) {
    return new Response({ status: 500 });
  }
};

export const PUT = async (req) => {
  try {
    const { subname: name, parent, _id } = await req.json();

    connectToDB();

    await SubCategory.updateOne({ _id }, { name, parent });
    return new Response({ status: 200 });
  } catch (error) {
    return new Response({ status: 500 });
  }
};
