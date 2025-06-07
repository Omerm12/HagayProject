"use client";

import React, { useState, useContext } from "react";
import { X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";

export default function CheckoutModal({ onClose }) {
  const [cardNumber, setCardNumber] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [installments, setInstallments] = useState(1);
  const [saveCard, setSaveCard] = useState(false);

  const { cart, shippingDetails, user, clearCart } = useApp();;
  const router = useRouter();

  const placeOrder = async () => {
    if (!shippingDetails || cart.length === 0) {
      alert("חסרים פרטי משלוח או שהעגלה ריקה");
      return;
    }
console.log("cart =", cart);

    const cartItems = cart.map(item => ({
  product_id: item.product_id,
  quantity: Number(item.quantity),
  price: Number(item.price_per_unit), // המרה למספר
}));

const total_price = cartItems.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);

console.log("total_price =", total_price); // לוודא שזה מספר


    const order = {
  user_id: user?.id,
  full_name: shippingDetails.fullName,
  phone: shippingDetails.phone,
  city: shippingDetails.city,
  street: shippingDetails.street,
  house_number: shippingDetails.houseNumber,
  floor: shippingDetails.floor || null, // ⬅️ זה מה שחסר לך
  notes: shippingDetails.notes,
  total_price,
};

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ order, cartItems }),
      });

      if (!res.ok) throw new Error("שגיאה ביצירת ההזמנה");

      clearCart();
      onClose();
      router.push("/order-success");
    } catch (err) {
      console.error(err);
      alert("שגיאה בביצוע ההזמנה");
    }
  };

  return (
    <div className="fixed inset-0 bg-[#00000050] flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 relative text-right">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-500 hover:text-black"
        >
          <X size={28} />
        </button>

        <h2 className="text-xl font-bold mb-4">תשלום באמצעות</h2>

        <div className="flex justify-center mb-6">
          <img src="/images/gpay-button.png" alt="GPay" className="h-12" />
        </div>

        <h3 className="font-bold text-md mb-2">או תשלום באמצעות כרטיס אשראי</h3>

        <label className="block text-sm font-semibold mb-1">מספר כרטיס *</label>
        <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="w-full border rounded-md px-3 py-2 mb-3" />

        <div className="flex gap-2 mb-3">
          <div className="w-1/2">
            <label className="block text-sm font-semibold mb-1">חודש</label>
            <select value={month} onChange={(e) => setMonth(e.target.value)} className="w-full border rounded-md px-3 py-2">
              <option value="">בחר</option>
              {[...Array(12)].map((_, i) => (
                <option key={i} value={i + 1}>{String(i + 1).padStart(2, "0")}</option>
              ))}
            </select>
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-semibold mb-1">שנה</label>
            <select value={year} onChange={(e) => setYear(e.target.value)} className="w-full border rounded-md px-3 py-2">
              <option value="">בחר</option>
              {[...Array(10)].map((_, i) => {
                const year = new Date().getFullYear() + i;
                return <option key={i} value={year}>{year}</option>;
              })}
            </select>
          </div>
        </div>

        <div className="flex gap-2 mb-3">
          <div className="w-1/2">
            <label className="block text-sm font-semibold mb-1">תעודת זהות *</label>
            <input type="text" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} className="w-full border rounded-md px-3 py-2" />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-semibold mb-1">CVV *</label>
            <input type="text" value={cvv} onChange={(e) => setCvv(e.target.value)} className="w-full border rounded-md px-3 py-2" />
          </div>
        </div>

        <div className="mb-3">
          <label className="block text-sm font-semibold mb-1">מספר תשלומים</label>
          <select value={installments} onChange={(e) => setInstallments(e.target.value)} className="w-full border rounded-md px-3 py-2">
            {[...Array(12)].map((_, i) => (
              <option key={i} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <input type="checkbox" checked={saveCard} onChange={(e) => setSaveCard(e.target.checked)} />
          <label className="text-sm">שמור פרטי כרטיס אשראי</label>
        </div>

        <button onClick={placeOrder} className="w-full bg-black text-white py-3 rounded-md font-bold text-lg">
          לתשלום
        </button>
      </div>
    </div>
  );
}
