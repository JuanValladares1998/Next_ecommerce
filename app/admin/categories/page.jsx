"use client";
import { useEffect, useRef, useState } from "react";

const page = () => {
  const [name, setName] = useState("");
  const [subname, setSubName] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [parent, setParent] = useState("");
  const [editedCategory, setEditedCategory] = useState("");
  const [editedSubCategory, setEditedSubCategory] = useState("");
  const [deleteCategory, setDeleteCategory] = useState("");
  const [deleteSubCategory, setDeleteSubCategory] = useState("");
  const input1 = useRef(null);
  const input2 = useRef(null);

  const input = "input w-full max-w-xs";

  async function saveCategory(ev) {
    ev.preventDefault();
    const data = { name };
    if (editedCategory) {
      data._id = editedCategory._id;
      try {
        await fetch("/api/admin/categories", {
          method: "PUT",
          body: JSON.stringify(data),
        });
      } catch (err) {
        console.log(err);
      }
      setEditedCategory("");
    } else {
      try {
        await fetch("/api/admin/categories", {
          method: "POST",
          body: JSON.stringify(data),
        });
      } catch (err) {
        console.log(err);
      }
    }
    setName("");
    setParent(0);

    await fetchCategories();
  }

  async function saveSubCategory(ev) {
    ev.preventDefault();
    const data = { subname, parent };
    console.log(data);
    if (editedSubCategory) {
      data._id = editedSubCategory._id;
      try {
        await fetch("/api/admin/subcategories", {
          method: "PUT",
          body: JSON.stringify(data),
        });
      } catch (err) {
        console.log(err);
      }
      setEditedSubCategory("");
    } else {
      try {
        await fetch("/api/admin/subcategories", {
          method: "POST",
          body: JSON.stringify(data),
        });
      } catch (err) {
        console.log(err);
      }
    }
    setSubName("");
    setParent(0);
    await fetchCategories();
  }

  async function fetchCategories() {
    let data;
    try {
      const response = await fetch("/api/categories");
      data = await response.json();
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
    try {
      const response = await fetch("/api/subcategories");
      data = await response.json();
      setSubCategories(data);
    } catch (err) {
      console.log(err);
    }
  }

  function editCategory(category) {
    input1.current.focus();
    setEditedCategory(category);
    setEditedSubCategory("");
    setName(category.name);
  }

  function editSubCategory(category) {
    input2.current.focus();
    setEditedCategory("");
    setEditedSubCategory(category);
    setSubName(category.name);
    setParent(category.parent?._id);
  }

  const dltCategory = async () => {
    try {
      await fetch(`/api/admin/categories/${deleteCategory._id}`, {
        method: "DELETE",
      });
      setDeleteCategory("");
      fetchCategories();
    } catch (err) {
      console.log(err);
    }
  };

  const dltSubCategory = async () => {
    try {
      await fetch(`/api/admin/subcategories/${deleteSubCategory._id}`, {
        method: "DELETE",
      });
      setDeleteSubCategory("");
      fetchCategories();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <section>
        <h1>Categorias</h1>
        <h2>Crear nueva categoría padre</h2>
        <form onSubmit={saveCategory}>
          <div className="flex items-center gap-2">
            <input
              ref={input1}
              className={
                editedCategory
                  ? input + " input-primary"
                  : input + " input-bordered"
              }
              type="text"
              placeholder="Nombre de la categoría"
              value={name}
              onChange={(ev) => setName(ev.target.value)}
            />
            {editedCategory ? (
              <button className="btn btn-primary">Actualizar</button>
            ) : (
              <button className="btn btn-primary">Crear</button>
            )}
            {editedCategory && (
              <button
                onClick={() => {
                  setEditedCategory("");
                  setName("");
                }}
                type="button"
                className="btn"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
        <table className="table w-full mt-4">
          <thead>
            <tr>
              <td>Nombre de la categoría</td>
              <td>Acciones</td>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              <>
                {categories.map((category) => (
                  <tr key={category._id}>
                    <td>{category.name}</td>

                    <td>
                      <button
                        className="btn btn-primary mr-10"
                        onClick={() => editCategory(category)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 inline mr-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                        Editar
                      </button>
                      <label
                        htmlFor="my-modal"
                        className="btn"
                        onClick={() => setDeleteCategory(category)}
                      >
                        Eliminar
                      </label>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td>
                  <label>No hay Categorias</label>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div>
          <input type="checkbox" id="my-modal" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Ventana de Confirmación</h3>
              <p className="py-4">
                ¿Desea eliminar la categoria{" "}
                <b>&quot;{deleteCategory.name}&quot;</b>?
              </p>
              <div className="modal-action">
                <label
                  htmlFor="my-modal"
                  className="btn btn-primary"
                  onClick={() => dltCategory()}
                >
                  Eliminar
                </label>
                <label
                  htmlFor="my-modal"
                  className="btn"
                  onClick={() => setDeleteCategory("")}
                >
                  Cancelar
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* SubCategories */}
      <section className="mt-10">
        <h2>Crear nueva categoría hijo</h2>
        <form onSubmit={saveSubCategory}>
          <div className="flex items-center gap-2">
            <input
              ref={input2}
              className={
                editedSubCategory
                  ? input + " input-primary"
                  : input + " input-bordered"
              }
              type="text"
              placeholder="Nombre de la categoría"
              value={subname}
              onChange={(ev) => setSubName(ev.target.value)}
            />
            <select
              className="select select-bordered w-full max-w-xs"
              value={parent}
              onChange={(ev) => setParent(ev.target.value)}
            >
              <option className="text-gray-500" defaultChecked value={0}>
                Sin categoria padre
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            {editedSubCategory ? (
              <button className="btn btn-primary">Actualizar</button>
            ) : (
              <button className="btn btn-primary">Crear</button>
            )}
            {editedSubCategory && (
              <button
                onClick={() => {
                  setEditedSubCategory("");
                  setSubName("");
                  setParent(0);
                }}
                type="button"
                className="btn"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
        <table className="table w-full mt-4">
          <thead>
            <tr>
              <td>Nombre de la categoría</td>
              <td>Categoría padre</td>
              <td>Acciones</td>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              <>
                {subcategories.map((category) => (
                  <tr key={category._id}>
                    <td>{category.name}</td>
                    <td>{category?.parent?.name}</td>
                    <td>
                      <button
                        className="btn btn-primary mr-10"
                        onClick={() => editSubCategory(category)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 inline mr-2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                        Editar
                      </button>
                      <label
                        htmlFor="my-modal2"
                        className="btn"
                        onClick={() => setDeleteSubCategory(category)}
                      >
                        Eliminar
                      </label>
                    </td>
                  </tr>
                ))}
              </>
            ) : (
              <tr>
                <td>
                  <label>No hay Subcategorias</label>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div>
          <input type="checkbox" id="my-modal2" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Ventana de Confirmación</h3>
              <p className="py-4">
                ¿Desea eliminar la categoria{" "}
                <b>&quot;{deleteSubCategory.name}&quot;</b>?
              </p>
              <div className="modal-action">
                <label
                  htmlFor="my-modal2"
                  className="btn btn-primary"
                  onClick={() => dltSubCategory()}
                >
                  Eliminar
                </label>
                <label
                  htmlFor="my-modal2"
                  className="btn"
                  onClick={() => setDeleteSubCategory("")}
                >
                  Cancelar
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
