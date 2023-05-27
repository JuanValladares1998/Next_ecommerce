"use client";
import ProductForm from "@/components/admin/ProductForm";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [product, setProduct] = useState([]);

  const getProduct = async () => {
    try {
      const response = await fetch("/api/products/" + id);
      const data = await response.json();
      setProduct(data);
    } catch (err) {}
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    getProduct();
  }, [id]);

  return (
    <>
      <h1 className="head_text text-center">Editar producto</h1>
      {product ? <ProductForm {...product} /> : <span>Cargando...</span>}
    </>
  );
};

export default page;
