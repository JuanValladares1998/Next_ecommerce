import { Product } from "@/models/Product";
import { connectToDB } from "@/utils/database";

export const POST = async (req) => {
  try {
    const { data } = await req.json();

    connectToDB();

    await Product.create(data);
    return new Response({ status: 200 });
  } catch (error) {
    return new Response({ status: 500 });
  }
};

export const PUT = async (req) => {
  try {
    const { title, description, price, images, _id, category, subCategory } =
      await req.json();

    connectToDB();

    await Product.updateOne(
      {
        _id: _id,
      },
      { title, description, price, images, category, subCategory }
    );
    return new Response({ status: 200 });
  } catch (error) {
    return new Response({ status: 500 });
  }
};
