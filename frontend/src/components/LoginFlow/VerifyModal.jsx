"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation"; 

export default function VerifyModal({ phone, onClose }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleVerify = async () => {
  const res = await signIn("credentials", {
    redirect: false,
    phone,
    code,
  });

  if (res.ok) {
    try {
      const userRes = await fetch(`http://localhost:5000/api/users/by-phone/${phone}`);
      if (!userRes.ok) throw new Error("שליפת משתמש נכשלה");
      const userData = await userRes.json();

      onClose();

       const redirectUrl = localStorage.getItem("redirectAfterLogin");
        if (redirectUrl) {
          localStorage.removeItem("redirectAfterLogin");
          router.push(redirectUrl); }
    } catch (err) {
      console.error("שגיאה בטעינת המשתמש:", err);
      setError("שגיאה בטעינת פרטי המשתמש");
    }
  } else {
    setError("קוד שגוי או שפג תוקפו");
  }
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl p-7 w-[500px] max-w-full relative text-center font-roboto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black cursor-pointer"
        >
          <X />
        </button>

        <img src="/images/logo-removebg-preview.png" alt="לוגו" className="w-82 mx-auto -mt-10" />
        <h2 className="text-2xl font-bold text-green-900 -mt-10">הזינו את הקוד שנשלח</h2>

        <input
          placeholder="הזן את קוד האימות"
          className="w-full border border-gray-300 rounded-md p-4 mb-4 text-right"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <button
          onClick={handleVerify}
          className="w-full text-md bg-green-900 text-white py-2 rounded-md font-bold hover:bg-green-800"
        >
          אימות
        </button>
      </div>
    </div>
  );
}