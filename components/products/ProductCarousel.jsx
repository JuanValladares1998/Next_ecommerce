"use client";
import { CartState } from "@/context/CartContext";
import React, { useEffect, useState } from "react";

const ProductCarousel = ({ product }) => {
  const [image, setImage] = useState(product.images[0]);
  const [inCart, setInCart] = useState(false);
  const {
    cartDispatch,
    cartState: { cart },
  } = CartState();

  useEffect(() => {
    const contain = cart.findIndex((item) => {
      return item._id == product._id;
    });
    console.log(contain);
    contain > -1 ? setInCart(true) : setInCart(false);
  }, [cart]);

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl w-full">
      <figure className="flex flex-col w-full ">
        <img
          className="object-contain h-[30rem]"
          src={image}
          alt={product.title}
        />
        <div className="w-full p-4">
          <div className="w-full p-4 h-32 relative gap-4 flex flex-nowrap overflow-x-scroll">
            {product.images.map((img) => (
              <figure key={img}>
                <img
                  className="object-contain cursor-pointer h-20 w-20 border-gray-400 border-2"
                  src={img}
                  alt={product.title}
                  onClick={() => setImage(img)}
                />
              </figure>
            ))}
          </div>
        </div>
      </figure>
      <div className="card-body w-full">
        <h1>{product.title}</h1>
        <h2>Precio: s/.{product.price}</h2>
        <p>{product.description}</p>
        <div className="card-actions flex flex-col gap-2">
          <button className="btn btn-primary w-full">Comprar</button>
          <button
            className={`btn w-full ${!inCart ? "btn-secondary" : "btn-outline btn-ghost"}`}
            onClick={() => {
              !inCart
                ? cartDispatch({
                    type: "ADD_TO_CART",
                    payload: { ...product },
                  })
                : cartDispatch({
                    type: "REM_FROM_CART",
                    payload: { ...product },
                  });
            }}
          >
            {!inCart ? "Agregar al" : "Quitar del"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
