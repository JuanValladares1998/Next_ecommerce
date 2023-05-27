"use client";
import ErrorAlert from "@/components/alerts/ErrorAlert";
import SuccessAlert from "@/components/alerts/SuccessAlert";
import Link from "next/link";
import { useEffect, useState } from "react";

const page = () => {
  const [products, setProducts] = useState([]);
  const [dltProduct, setDltProduct] = useState([]);
  const [alert, setAlert] = useState("");

  const getProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async () => {
    try {
      const res = await fetch(`/api/admin/products/${dltProduct._id}`, {
        method: "DELETE",
      });
      setAlert({ status: res.status, message: await res.text() });
      setTimeout(() => {
        setAlert("");
      }, 6000);
      getProducts();
    } catch (err) {}
  };

  useEffect(() => {
    getProducts();
  }, []);

  const Skeleton = () => {
    let i = [1, 2, 3, 4];
    return (
      <>
        {i.map((e) => (
          <tr key={i}>
            <td>
              <div class="animate-pulse flex w-full h-20 p-2 bg-slate-200 rounded-lg justify-center items-center">
                <div class="flex-1 space-y-6 py-1">
                  <div class="h-2 bg-slate-300 rounded"></div>
                </div>
              </div>
            </td>
            <td>
              <div class="animate-pulse flex w-full bg-slate-200 rounded-lg p-2">
                <div class="rounded-lg bg-slate-300 h-16 w-20"></div>
              </div>
            </td>
            <td>
              <div class="animate-pulse flex w-full bg-slate-200 rounded-lg px-2 py-5">
                <div class="rounded-lg bg-slate-300 h-10 w-28 mr-2"></div>
                <div class="rounded-lg bg-slate-300 h-10 w-28"></div>
              </div>
            </td>
          </tr>
        ))}
      </>
    );
  };

  return (
    <>
      <Link className="btn btn-success" href={"/admin/products/new"}>
        Agregar nuevo producto
      </Link>
      <div className="mt-4">
        {alert.status === 500 && <ErrorAlert text={alert.message} />}
        {alert.status === 200 && <SuccessAlert text={alert.message} />}
      </div>
      <table className="table w-full mt-4">
        <thead>
          <tr>
            <td>Nombre del producto</td>
            <td>Imagen</td>
            <td>Acciones</td>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            <>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <span className="flex w-full">{product.title}</span>
                  </td>
                  <td>
                    <div className="flex w-full">
                      <div className="h-20 w-20 border-gray-400 overflow-hidden border-2 grid items-center rounded-lg">
                        <img
                          className="object-cover"
                          src={product.images[0]}
                          alt={product.name}
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex w-full">
                      <Link
                        className="btn btn-primary mr-2"
                        href={"/admin/products/edit?id=" + product._id}
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
                      </Link>
                      <label
                        onClick={() => setDltProduct(product)}
                        htmlFor="my-modal"
                        className="btn"
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
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                        Delete
                      </label>
                    </div>
                  </td>
                </tr>
              ))}
            </>
          ) : (
            <Skeleton />
          )}
        </tbody>
      </table>
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Eliminar producto</h3>
          <p className="py-4">
            ¿Desea eliminar el producto <b>{dltProduct.title}</b>?
          </p>
          <div className="modal-action">
            <label
              htmlFor="my-modal"
              className="btn btn-primary"
              onClick={() => deleteProduct()}
            >
              Aceptar
            </label>
            <label htmlFor="my-modal" className="btn">
              Cancelar
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
