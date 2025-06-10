"use client";

import React, { useEffect, useState } from "react";
import { Plus, Minus, Heart } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const ItemCard = ({ item, onRemoveFromFavorites }) => {
  const { cart, addToCart, decrementFromCart, user, setIsLoginFlowOpen } = useApp();
  const [isFavorite, setIsFavorite] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!user?.id) return;
    fetch(`${API_URL}/api/favorites/user/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setIsFavorite(data.some((fav) => fav.id === item.id));
      });
  }, [user]);

  const toggleFavorite = async () => {
    if (!user?.id) return signIn();

    const url = isFavorite
      ? `${API_URL}/api/favorites/remove`
      : `${API_URL}/api/favorites/add`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id, product_id: item.id }),
    });

    if (res.ok) {
      setIsFavorite(!isFavorite);
      if (isFavorite && onRemoveFromFavorites) {
        onRemoveFromFavorites(item.id);
      }
    }
  };

  const handleProtectedCartAction = (actionFn) => {
    if (session?.user) {
      actionFn();
    } else {
      localStorage.setItem("redirectAfterLogin", window.location.href);
      setIsLoginFlowOpen(true);
    }
  };

  const quantity = cart.find((c) => c.product_id === item.id)?.quantity || 0;

  return (
    <>
      {/* Desktop */}
      <div className="hidden sm:flex flex-col w-full max-w-xs rounded-xl overflow-hidden text-center p-4 relative shadow-xl border border-gray-200 hover:shadow-2xl transition mx-auto">
        <button
          onClick={toggleFavorite}
          className={`absolute top-3 left-3 p-1 rounded-full shadow cursor-pointer ${
            isFavorite ? "bg-red-100 text-red-500" : "bg-gray-100 text-gray-500"
          } hover:scale-105 transition`}
          title={isFavorite ? "הסר ממועדפים" : "הוסף למועדפים"}
        >
          <Heart fill={isFavorite ? "currentColor" : "none"} size={20} />
        </button>
        <img
          src={`${API_URL}${item.image_url}`}
          alt={item.title}
          className="w-full h-52 object-contain p-2 mt-3"
        />
        <h3 className="text-xl font-semibold text-green-900 mt-3">{item.title}</h3>
        <div className="flex justify-center items-center mt-2 gap-2">
          <button
            onClick={() => handleProtectedCartAction(() => decrementFromCart(item.id))}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2"
          >
            <Minus size={18} />
          </button>
          <div className="text-md bg-gray-100 text-green-900 px-2 py-1 rounded-md font-bold min-w-[30px]">
            {quantity}
          </div>
          <button
            onClick={() => handleProtectedCartAction(() => addToCart(item.id))}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2"
          >
            <Plus size={18} />
          </button>
        </div>
        <div className="text-md font-bold text-green-900 mt-2">
          ₪{item.price_per_unit} / {item.unit || "יחידה"}
        </div>
      </div>

      {/* Mobile */}
      <div
        className="sm:hidden flex flex-row items-center w-[98%] p-3 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition gap-3"
        style={{ direction: "rtl" }}
      >
        <div className="w-[90px] h-[90px] flex-shrink-0">
          <img
            src={`${API_URL}${item.image_url}`}
            alt={item.title}
            className="w-full h-full object-contain rounded-md"
          />
        </div>

        <div className="flex flex-col justify-between flex-1 h-full">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <h3 className="text-base font-bold text-green-900 truncate">
                {item.title}
              </h3>
              <div className="text-sm font-bold text-green-900 mt-1">
                ₪{item.price_per_unit} / {item.unit || "יחידה"}
              </div>
            </div>
            <button
              onClick={toggleFavorite}
              className={`p-1 rounded-full shadow ${
                isFavorite ? "bg-red-100 text-red-500" : "bg-gray-100 text-gray-500"
              } hover:scale-105 transition`}
            >
              <Heart fill={isFavorite ? "currentColor" : "none"} size={18} />
            </button>
          </div>

          <div className="flex items-center gap-2 mt-auto self-end">
            <button
              onClick={() => handleProtectedCartAction(() => decrementFromCart(item.id))}
              className="bg-green-500 hover:bg-green-600 text-white rounded-full p-1.5"
            >
              <Minus size={16} />
            </button>
            <span className="text-sm bg-gray-100 text-green-900 px-2 py-1 rounded-md font-bold min-w-[24px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => handleProtectedCartAction(() => addToCart(item.id))}
              className="bg-green-500 hover:bg-green-600 text-white rounded-full p-1.5"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemCard;
