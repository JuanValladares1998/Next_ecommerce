import { Category } from "@/models/Category";
import { connectToDB } from "@/utils/database";

export const DELETE = async (req, { params }) => {
  try {
    connectToDB();
    await Category.findOneAndDelete({ _id: params.id });
    return new Response("Categoría eliminada correctamente", { status: 200 });
  } catch (error) {
    return new Response("Error al eliminar categoria", { status: 500 });
  }
};
