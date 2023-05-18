import ProductForm from "@/components/ProductForm";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <>
      <h1 className="head_text text-center">Nuevo producto</h1>
      <ProductForm />
    </>
  );
};

export default page;
