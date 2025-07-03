"use client";

import React from "react";
import ProductCard from "@/components/ProductCard";

export default function Recommended({ products }) {
  // סינון רק מוצרים שלא במבצע
  const recommendedProducts = products.filter((item) => !item.on_sale);

  return (
    <div className="max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-10 font-roboto">
      <h2 className="text-4xl sm:text-3xl md:text-4xl font-extrabold text-green-900 text-center mb-6 sm:mb-8 md:mb-10">
        המומלצים שלנו
      </h2>

      {/* רשימת מוצרים מומלצים */}
      <div className="flex flex-wrap justify-center gap-4 pb-4">
        {recommendedProducts.map((item, idx) => (
          <ProductCard key={idx} item={item} />
        ))}
      </div>
    </div>
  );
}
