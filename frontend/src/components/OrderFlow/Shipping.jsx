"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useApp } from "@/context/AppContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ShippingModal({ onClose, onSubmit }) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(""); // ✅ חדש
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [floor, setFloor] = useState("");
  const [notes, setNotes] = useState("");
  const [settlements, setSettlements] = useState([]);
  const { saveShippingDetails } = useApp();

  useEffect(() => {
    fetch(`${API_URL}/api/settlements`)
      .then((res) => res.json())
      .then(setSettlements)
      .catch(console.error);
  }, []);

  const isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = () => {
    if (!fullName || !phone || !email || !city || !street || !houseNumber) {
      alert("אנא מלא את כל השדות החובה");
      return;
    }

    if (!isEmailValid(email)) {
      alert("אנא הזן כתובת מייל חוקית");
      return;
    }

    saveShippingDetails({
      fullName,
      phone,
      email, // ✅ נשלח לשמירה
      city,
      street,
      houseNumber,
      floor,
      notes,
    });

    onSubmit();
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

        <h2 className="text-xl font-bold mb-4">פרטי משלוח</h2>

        <label className="block text-sm font-semibold mb-1">שם מלא *</label>
        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full border rounded-md px-3 py-2 mb-3" />

        <label className="block text-sm font-semibold mb-1">מספר טלפון *</label>
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full border rounded-md px-3 py-2 mb-3" />

        <label className="block text-sm font-semibold mb-1">אימייל *</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded-md px-3 py-2 mb-3" />

        <label className="block text-sm font-semibold mb-1">עיר *</label>
        <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full border rounded-md px-3 py-2 mb-3">
          <option value="">בחר עיר</option>
          {settlements.map((s) => (
            <option key={s.id} value={s.name}>{s.name}</option>
          ))}
        </select>

        <div className="flex gap-2 mb-3">
          <div className="w-1/2">
            <label className="block text-sm font-semibold mb-1">רחוב *</label>
            <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} className="w-full border rounded-md px-3 py-2" />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-semibold mb-1">מס' בית *</label>
            <input type="text" value={houseNumber} onChange={(e) => setHouseNumber(e.target.value)} className="w-full border rounded-md px-3 py-2" />
          </div>
        </div>

        <label className="block text-sm font-semibold mb-1">קומה</label>
        <input type="text" value={floor} onChange={(e) => setFloor(e.target.value)} className="w-full border rounded-md px-3 py-2 mb-3" />

        <label className="block text-sm font-semibold mb-1">הערות למשלוח</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full border rounded-md px-3 py-2 mb-6" rows={3} />

        <button onClick={handleSubmit} className="w-full bg-black text-white py-3 rounded-md font-bold text-lg">שמור פרטי משלוח</button>
      </div>
    </div>
  );
}
