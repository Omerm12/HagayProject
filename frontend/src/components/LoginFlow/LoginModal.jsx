"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

    const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LoginModal({ onClose, onGoToVerify, onGoToRegister }) {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const verifyPhone = async () => {
    setError("");
    const res = await fetch("/api/auth/check-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });

    const data = await res.json();
    if (data.exists) {
     await fetch(`${API_URL}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      onGoToVerify(phone);
    } else {
      onGoToRegister(phone);
    }
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

        <h2 className="text-2xl font-bold text-green-900 -mt-10">כיף לראות אתכם שוב!</h2>
        <h3 className="text-xl font-bold text-green-900 mb-6">
          אנא הזינו מספר נייד כדי להתחבר לחשבונכם.
          <br />
          אם עדיין לא נרשמתם, תועברו להרשמה.
        </h3>

        <input
          type="tel"
          placeholder="... מספר נייד"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-4 mb-4 text-right"
        />

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <button
          onClick={verifyPhone}
          className="w-full text-md bg-green-900 text-white py-2 rounded-md font-bold hover:bg-green-800 pointer-cursor"
        >
          שליחה
        </button>
      </div>
    </div>
  );
}