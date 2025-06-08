"use client";
import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const { user } = useApp();

  const [selectedOrderItems, setSelectedOrderItems] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!user?.id) return;

    fetch(`${API_URL}/api/orders/user/${user.id}`)
      .then((res) => res.json())
      .then(setOrders)
      .catch(console.error);
  }, [user?.id]);
  
 useEffect(() => {
  if (isModalOpen) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
  } else {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  }

  return () => {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
  };
}, [isModalOpen]);

  const handleOpenItems = async (orderId) => {
    const res = await fetch(`${API_URL}/api/orders/${orderId}/items`);
    const items = await res.json();
    setSelectedOrderItems(items);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-5xl font-bold text-center mb-8 text-green-900 mt-35">ההזמנות שלי</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">אין הזמנות להצגה כרגע.</p>
      ) : (
<div className="overflow-y-auto max-h-[650px] rounded-2xl border border-gray-200 bg-white shadow-lg mb-44">
          <table className="w-full text-base text-right text-gray-700">
            <thead className="bg-green-100 text-green-900 text-lg">
              <tr>
                <th className="px-6 py-3">#</th>
                <th className="px-6 py-3">תאריך</th>
                <th className="px-6 py-3">סטטוס</th>
                <th className="px-6 py-3">סכום</th>
                <th className="px-6 py-3">פריטים</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, i) => (
                <tr
                  key={o.id}
                  className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-green-50 transition`}
                >
                  <td className="px-6 py-4 font-semibold">{i + 1}</td>
                  <td className="px-6 py-4">
                    {new Date(o.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        o.delivery_status === "סופקה"
                          ? "bg-green-200 text-green-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {o.delivery_status || "לא ידוע"}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold">₪ {o.total_price}</td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm"
                      onClick={() => handleOpenItems(o.id)}
                    >
                      צפייה בפריטים
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
  <>
    {/* שכבת הרקע הכהה */}
 <div className="fixed inset-0 bg-gray-800/40 z-40"></div>

<div className="fixed inset-0 flex items-center justify-center z-50">
  <div className="bg-white rounded-lg shadow-lg w-full max-w-xl text-right max-h-[60vh] flex flex-col">

    <h2 className="text-xl font-bold p-4 border-b">פריטי ההזמנה</h2>

    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {selectedOrderItems?.map((item, i) => (
        <div key={i} className="flex gap-4 items-center border-b pb-3">
          <img
            src={item.image_url}
            alt={item.product_name}
            className="w-20 h-20 object-contain rounded border"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{item.product_name}</h3>
            <p className="text-sm text-gray-600">
              כמות: {item.quantity} × ₪{item.price_per_unit}
            </p>
            <p className="text-sm font-bold mt-1">
              סה"כ לפריט: ₪ {(item.quantity * item.price_per_unit)}
            </p>
          </div>
        </div>
      ))}
    </div>

    <div className="border-t p-4">
      <button
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full w-full"
        onClick={() => setIsModalOpen(false)}
      >
        סגור
      </button>
    </div>
  </div>
</div>
  </>
      )}
    </div>
  );
}
