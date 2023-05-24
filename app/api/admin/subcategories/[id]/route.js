import { SubCategory } from "@/models/SubCategory";
import { connectToDB } from "@/utils/database";

export const DELETE = async (req, { params }) => {
  try {
    connectToDB();
    await SubCategory.findOneAndDelete({ _id: params.id });
    return new Response("Subcategoría eliminada correctamente", {
      status: 200,
    });
  } catch (error) {
    return new Response("Error al eliminar subcategoria", { status: 500 });
  }
};
