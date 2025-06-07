"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";

export default function ProductCard({ item }) {
  const [quantity, setQuantity] = useState(0);

  return (
    <div className="w-full md:w-[295px] flex-shrink-0 rounded-xl overflow-hidden text-center p-3 relative shadow-xl bg-[#F6E8CA]">
      {/* מובייל – תמונה בצד שמאל, טקסט מימין, מונה בצד ימין */}
      <div className="flex md:hidden items-center gap-3 rounded-xl p-3 min-h-[100px] bg-gradient-to-l ">
        {/* מונה */}
        <div className="flex items-center gap-2">
          {quantity > 0 ? (
            <>
              <button
                onClick={() => setQuantity((q) => Math.max(0, q - 1))}
                className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
              >
                <Minus size={16} />
              </button>
              <span className="font-bold text-green-800 w-5 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
              >
                <Plus size={16} />
              </button>
            </>
          ) : (
            <button
              onClick={() => setQuantity(1)}
              className="bg-green-600 text-white rounded-full w-9 h-9 flex items-center justify-center text-xl"
            >
              +
            </button>
          )}
        </div>

        {/* טקסט ותמונה */}
        <div className="flex flex-1 items-center justify-end gap-3">
          <div className="flex flex-col items-end text-right">
            <span className="text-xl font-semibold text-green-900">{item.title}</span>
            <span className="text-xl font-bold text-green-700">
              ₪{item.price.toFixed(2)}
            </span>

            <div className="flex items-center gap-1 mt-1">
              <span className="bg-green-100 text-green-900 text-md px-2 py-0.5 rounded-full font-semibold">
                {item.unit || "יח׳"}
              </span>
              <span className="text-xs text-gray-600">יח׳</span>
            </div>
          </div>

          <img
            src={item.image}
            alt={item.title}
            className="w-20 h-20 object-contain"
          />
        </div>
      </div>

      {/* דסקטופ – עיצוב רגיל */}
      <div className="hidden md:block">
        {item.badge && (
          <span className="absolute top-3 right-3 bg-yellow-200 text-black px-2 py-1 rounded-full text-xs font-bold shadow-sm">
            {item.badge}
          </span>
        )}
        <div className="rounded-xl overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-52 object-contain p-2"
          />
        </div>
        <h3 className="text-xl font-semibold text-green-900 mt-3">{item.title}</h3>

        <div className="flex justify-center items-center mt-2 gap-2">
          <button
            onClick={() => setQuantity((q) => Math.max(0, q - 1))}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2 shadow-md"
          >
            <Minus size={18} />
          </button>
          <div className="text-base bg-gray-100 text-green-900 px-2 py-1 rounded-md font-bold">
            {quantity}
          </div>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2 shadow-md"
          >
            <Plus size={18} />
          </button>
        </div>

        <div dir="rtl" className="text-md font-bold text-green-900 mt-2">
          ₪{item.price.toFixed(2)} / {item.unit || "יחידה"}
        </div>
      </div>
    </div>
  );
}
