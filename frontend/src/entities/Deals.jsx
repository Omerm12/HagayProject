"use client";

import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";

export default function Deals({ products }) {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="relative max-w-[1540px] mx-auto px-4 sm:px-6 lg:px-10 font-roboto">
      <h2 className="text-4xl sm:text-3xl md:text-4xl font-extrabold text-green-900 text-center mb-6 sm:mb-8 md:mb-10">
        המבצעים שלנו
      </h2>

      {/* חצים במסכים גדולים */}
      <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 w-full justify-between px-2 z-10 pointer-events-none">
        <button
          onClick={scrollLeft}
          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-lg pointer-events-auto"
        >
          <ChevronLeft size={30} />
        </button>
        <button
          onClick={scrollRight}
          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-lg pointer-events-auto"
        >
          <ChevronRight size={30} />
        </button>
      </div>

      {/* רשימת מוצרים */}
      <div
        ref={scrollRef}
        className="flex flex-col md:flex-row md:overflow-x-auto gap-4 pb-4 scroll-smooth no-scrollbar"
      >
        {products.map((item, idx) => (
          <ProductCard key={idx} item={item} />
        ))}
      </div>
    </div>
  );
}
