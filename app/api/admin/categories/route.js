import { Category } from "@/models/Category";
import { connectToDB } from "@/utils/database";

export const POST = async (req) => {
  try {
    const { name } = await req.json();
    connectToDB();
    await Category.create({ name });
    return new Response("Categoría creada correctamente", { status: 200 });
  } catch (error) {
    return new Response("Error al crear categoria", { status: 500 });
  }
};

export const PUT = async (req) => {
  try {
    const { name, _id } = await req.json();
    connectToDB();
    await Category.updateOne(
      {
        _id,
      },
      { name }
    );
    return new Response("Categoría actualizada correctamente", { status: 200 });
  } catch (error) {
    return new Response("Error al actualizar categoria", { status: 500 });
  }
};
