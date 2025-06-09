"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function RegisterDetailsModal({ phone, onClose, onGoToVerify }) {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

 const handleSubmit = async () => {
  const res = await fetch(`${API_URL}/api/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone, ...form }),
  });

  const data = await res.json();
  if (res.ok) {
    await fetch(`${API_URL}/api/auth/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
    onGoToVerify(phone); // 👈 מעבר ל־Verify
  } else {
    setError(data.message || "שגיאה בהרשמה");
  }
};


  const updateField = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000050] backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl p-7 w-[500px] max-w-full relative text-center font-roboto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black cursor-pointer"
        >
          <X />
        </button>

        <img
          src="/images/logo-removebg-preview.png"
          alt="לוגו"
          className="w-82 mx-auto -mt-10"
        />

        <h2 className="text-2xl font-bold text-green-900 -mt-10">הרשמה</h2>
        <h3 className="text-xl font-bold text-green-900 mb-6">
          אנא הזינו את פרטיכם כדי להתחבר
        </h3>

        <input
          name="full_name"
          placeholder="שם מלא"
          onChange={updateField}
          className="w-full border border-gray-300 rounded-md p-4 mb-4 text-right"
        />
        <input
          name="email"
          placeholder="מייל"
          onChange={updateField}
          className="w-full border border-gray-300 rounded-md p-4 mb-4 text-right"
        />
        <input
          type="tel"
          disabled
          value={phone}
          className="w-full border border-gray-300 rounded-md p-4 mb-4 text-right bg-gray-100 text-gray-500"
        />

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <button
          onClick={handleSubmit}
          className="w-full text-md bg-green-900 text-white py-2 rounded-md font-bold hover:bg-green-800 pointer-cursor"
        >
          הירשם
        </button>
      </div>
    </div>
  );
}
