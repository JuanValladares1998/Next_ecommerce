"use client";
import ProductCarousel from "@/components/products/ProductCarousel";
import ProductCarouselSkeleton from "@/components/products/ProductCarouselSkeleton";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [product, setProduct] = useState(null);

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
    <section className="max-w-7xl p-4 pt-28 flex-center w-full mx-auto flex-col">
      {product ? (
        <ProductCarousel product={product} />
      ) : (
        <ProductCarouselSkeleton />
      )}
    </section>
  );
};

export default page;
