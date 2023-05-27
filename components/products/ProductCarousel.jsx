"use client";
import React, { useState } from "react";

const ProductCarousel = ({ product }) => {
  const [image, setImage] = useState(product.images[0]);
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
              <figure>
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
          <button className="btn btn-primary w-full">Agregar al carrito</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
