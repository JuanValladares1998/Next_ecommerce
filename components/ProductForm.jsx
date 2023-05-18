"use client";
import Link from "next/link";
// import { deleteFile, uploadFile } from "@/utils/firebase";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ProductForm = ({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: existingCategory,
  subCategory: existingSubCategory,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState(0);
  const [subCategory, setSubCategory] = useState(0);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  async function submitForm(ev) {
    ev.preventDefault();
    const data = { title, description, price, images, category, subCategory };
    let success;
    if (_id) {
      success = await fetch("/api/admin/products", {
        method: "PUT",
        body: JSON.stringify({ ...data, _id }),
      });
    } else {
      success = await fetch("/api/admin/products", {
        method: "POST",
        body: JSON.stringify({ data }),
      });
    }
    console.log(success);
    if (success?.status === 200) {
      router.push("/admin/products");
    }
  }

  // async function uploadImage(ev) {
  //   try {
  //     setUploading(true);
  //     const url = await uploadFile(ev.target.files[0]);
  //     setUploading(false);
  //     setImages((img) => [...img, url]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  function setFirstImage(img) {
    const fotosSinMarcar = images.filter((photo) => photo !== img);
    const nuevoOrden = [img, ...fotosSinMarcar];
    setImages(nuevoOrden);
  }

  // async function deleteImage(url) {
  //   const success = await deleteFile(url);
  //   if (!success) return;
  //   const array = images.filter((photo) => photo !== url);
  //   setImages(array);
  // }

  function fetchCategories() {
    // axios.get("/api/categories").then((result) => {
    //   setCategories(result.data);
    // });
    // axios.get("/api/subcategories").then((result) => {
    //   setSubCategories(result.data);
    // });
  }

  useEffect(() => {
    // fetchCategories();
    setTitle(existingTitle);
    setDescription(existingDescription);
    // setCategories(existingCategory);
    // setSubCategories(existingSubCategory);
    setPrice(existingPrice);
    setImages(existingImages);
  }, [
    existingTitle,
    existingDescription,
    existingCategory,
    existingImages,
    existingPrice,
    existingSubCategory,
  ]);

  return (
    <form onSubmit={submitForm} className="mt-8 bg-slate-200  p-4 rounded-lg">
      <fieldset>
        <label>Nombre del producto</label>
        <input
          className="input input-bordered w-full block"
          type="text"
          placeholder="Nombre del prodyucto"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
      </fieldset>
      <fieldset>
        <label>Fotos</label>
        <div className="mb-2 flex items-center gap-2">
          {images?.length ? (
            <div className="flex gap-2 my-2 text-gray-700">
              {images.map((img, i) => (
                <div
                  className="w-40 h-40 relative border-gray-400 overflow-hidden border-2 grid items-center rounded-lg"
                  key={img}
                >
                  <img className={"object-cover"} src={img} alt={img} />
                  <div
                    onClick={() => setFirstImage(img)}
                    className="absolute cursor-pointer bottom-2 left-2 p-2 bg-gray-300 rounded-md"
                  >
                    {i === 0 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                      </svg>
                    )}
                  </div>
                  <div
                    onClick={() => deleteImage(img)}
                    className="absolute cursor-pointer bottom-2 right-2 p-2 bg-gray-300 rounded-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </div>
                </div>
              ))}
              {uploading && (
                <div className="w-40 h-40 border-gray-400 border-2 flex justify-center items-center rounded-lg">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="animate-spin w-10 h-10 mx-auto"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M12 3V6M3 12H6M5.63607 5.63604L7.75739 7.75736M5.63604 18.3639L7.75736 16.2426M21 12.0005H18M18.364 5.63639L16.2427 7.75771M11.9998 21.0002V18.0002M18.3639 18.3642L16.2426 16.2429"
                        stroke="#000000"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
              )}
            </div>
          ) : (
            <p className="mt-2">No hay fotos</p>
          )}
          <label className="w-32 h-32 border text-center bg-gray-200 border-gray-500 text-gray-700 rounded-lg flex flex-col justify-center items-center p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
              />
            </svg>
            <div>Agregar fotos</div>
            <input
              onChange={(ev) => uploadImage(ev)}
              type="file"
              className="hidden"
            />
          </label>
        </div>
      </fieldset>
      <fieldset>
        <label>Descripción</label>
        <textarea
          className="textarea textarea-bordered resize-none block w-full"
          placeholder="Descripción"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
      </fieldset>
      <fieldset>
        <label>Precio en s/.</label>
        <input
          className="input input-bordered w-full block"
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
        />
      </fieldset>
      <fieldset>
        <label>Categoría</label>
        <div className="flex gap-2">
          <select
            className="select select-bordered grow"
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}
          >
            <option className="text-gray-500" defaultChecked disabled value={0}>
              Sin categoría
            </option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          <select
            className="select select-bordered grow"
            value={subCategory}
            onChange={(ev) => setSubCategory(ev.target.value)}
          >
            <option className="text-gray-500" defaultChecked disabled value={0}>
              Sin subcategoría
            </option>
            {category &&
              subCategories
                .filter((cat) => cat.parent._id === category)
                .map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
          </select>
        </div>
      </fieldset>
      <button className="btn btn-primary" type="submit">
        Guardar
      </button>
      <Link href={"/admin/products"} className="btn ml-2">
        Cancelar
      </Link>
    </form>
  );
};

export default ProductForm;
