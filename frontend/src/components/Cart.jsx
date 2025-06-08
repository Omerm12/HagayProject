"use client";

import React, { useEffect, useState } from "react";
import { X, ShoppingCart, Trash2 } from "lucide-react";
import CartItem from "./CartItem";
import OrderFlow from "./OrderFlow/OrderFlow";
import { useApp } from "@/context/AppContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Cart({ onClose }) {
  const [cart, setCart] = useState([]);
  const { user, isShippingOpen, openShippingFlow, setIsLoginFlowOpen } = useApp();

  useEffect(() => {
    if (user?.id) fetchCart();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [user?.id]);

  const fetchCart = async () => {
    if (!user?.id) return;
    const res = await fetch(`${API_URL}/api/cart?user_id=${user.id}`);
    const data = await res.json();
    setCart(data);
  };

  const updateItem = async (productId, newQty) => {
    if (!user?.id) return;
    await fetch(`${API_URL}/api/cart/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id, product_id: productId, quantity: newQty }),
    });
    fetchCart();
  };

  const removeItem = async (productId) => {
    if (!user?.id) return;
    await fetch(`${API_URL}/api/cart/remove`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id, product_id: productId }),
    });
    fetchCart();
  };

  const clearCart = async () => {
    if (!user?.id) return;
    await fetch(`${API_URL}/api/cart/clear`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id }),
    });
    fetchCart();
  };

  const total = cart.reduce((acc, item) => acc + item.price_per_unit * item.quantity, 0);

  if (isShippingOpen) {
    return <OrderFlow />;
  }

  const handleOverlayClick = (e) => {
    if (e.target.id === "cartOverlay") {
      onClose();
    }
  };

  return (
    <div
      id="cartOverlay"
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black/50 z-40 flex justify-end"
    >
      <div
        className="fixed top-0 right-0 w-full sm:max-w-xl bg-white h-screen shadow-lg z-50 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* כותרת */}
        <div className="flex items-center justify-between bg-orange-400 text-white px-4 py-6 sm:py-8 sm:mb-0 rounded sm:rounded-none gap-2">
          <div className="flex items-center gap-2">
            <button onClick={onClose}>
              <X size={30} className="sm:size-[40px]" />
            </button>
            <div className="flex items-center gap-2 text-lg sm:text-2xl font-bold">
              <ShoppingCart size={24} className="sm:size-[28px] text-white" />
              <span>
                הסל שלך <span className="font-extrabold">({cart.length})</span>
              </span>
            </div>
          </div>
          <button
            onClick={clearCart}
            className="text-sm sm:text-md font-extrabold flex items-center gap-1"
          >
            <Trash2 size={18} className="sm:size-[20px]" /> ריקון עגלה
          </button>
        </div>

        {/* מוצרים - ניתן לגלול */}
        <div className="flex-1 overflow-y-auto px-4 mt-6">
          {cart.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              quantity={item.quantity}
              onIncrease={() => updateItem(item.product_id, item.quantity + 1)}
              onDecrease={() => updateItem(item.product_id, item.quantity - 1)}
              onRemove={() => removeItem(item.product_id)}
            />
          ))}
        </div>

        {/* סה"כ לתשלום - מקובע בתחתית */}
        <div className="sticky bottom-0 bg-white border-t px-4 py-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg sm:text-xl font-bold">סה"כ לתשלום</h3>
            <span className="text-lg sm:text-xl font-bold">₪{total.toFixed(2)}</span>
          </div>
          <button
           onClick={() => {
  if (!user?.id) {
    setIsLoginFlowOpen(true); // נפתח את מודאל ההתחברות
  } else {
    openShippingFlow(); // אם מחובר - נפתח את שלב המשלוח
  }
}}
            className="w-full bg-orange-400 font-extrabold text-white py-4 sm:py-5 rounded text-xl sm:text-2xl"
          >
            לתשלום
          </button>
        </div>
      </div>
    </div>
  );
}
