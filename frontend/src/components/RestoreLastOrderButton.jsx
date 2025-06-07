"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useApp } from "@/context/AppContext";

export default function RestoreLastOrderButton() {
  const { data: session } = useSession();
  const { user, fetchCart, addToCart, clearCart } = useApp();
  const [loading, setLoading] = useState(false);
  const [hasPreviousOrder, setHasPreviousOrder] = useState(null); // null=לא נטען עדיין
  const [tooltip, setTooltip] = useState("");

  useEffect(() => {
    const checkForPreviousOrder = async () => {
      if (!user?.id) {
        setHasPreviousOrder(false);
        setTooltip("יש להתחבר כדי לשחזר הזמנה");
        return;
      }

      try {
        const res = await fetch(`http://localhost:5000/api/orders/last?user_id=${user.id}`);
        const data = await res.json();
        if (data.items?.length > 0) {
          setHasPreviousOrder(true);
          setTooltip("");
        } else {
          setHasPreviousOrder(false);
          setTooltip("אין הזמנות קודמות");
        }
      } catch (err) {
        console.error("שגיאה בבדיקת הזמנות קודמות:", err);
        setHasPreviousOrder(false);
        setTooltip("שגיאה בטעינה");
      }
    };

    checkForPreviousOrder();
  }, [user?.id]);

  const handleRestore = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/orders/last?user_id=${user.id}`);
      const data = await res.json();

      if (!data?.items?.length) {
        setTooltip("אין הזמנות קודמות");
        return;
      }

      await clearCart();
      for (const item of data.items) {
        await addToCart(item.product_id, item.quantity);
      }
      await fetchCart();
    } catch (error) {
      console.error("שגיאה בשחזור ההזמנה:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleRestore}
      disabled={!hasPreviousOrder || loading}
      title={tooltip}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full w-[220px] font-bold shadow
        ${hasPreviousOrder ? "bg-white text-green-900 hover:bg-green-50" : "bg-gray-200 text-gray-500 cursor-not-allowed"}`}
    >
      {loading ? "טוען..." : "שחזור הזמנה"}
    </button>
  );
}
