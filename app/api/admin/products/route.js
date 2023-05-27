import { Product } from "@/models/Product";
import { connectToDB } from "@/utils/database";

export const POST = async (req) => {
  try {
    const { data } = await req.json();
    const { title, description, price, images, category, subCategory } = data;
    if (
      !title ||
      !description ||
      !price ||
      // !images ||
      !category ||
      !subCategory
    ) {
      return new Response("Falta completar los campos", { status: 500 });
    }
    connectToDB();
    const product = await Product.create(data);

    return new Response("Creado correctamente", { status: 200 });
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
    return new Response("Actualizado correctamente", { status: 200 });
  } catch (error) {
    return new Response({ status: 500 });
  }
};
