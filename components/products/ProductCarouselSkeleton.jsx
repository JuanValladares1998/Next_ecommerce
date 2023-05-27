"use client";
import React, { useState } from "react";

const ProductCarousel = () => {
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl w-full h-[640px] animate-pulse">
      <figure className="flex flex-col w-full h-full bg-slate-300 animate-pulse"></figure>
      <div className="card-body w-full h-full bg-slate-100 animate-pulse"></div>
    </div>
  );
};

export default ProductCarousel;
