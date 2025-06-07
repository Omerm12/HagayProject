"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import Register from "./Register";

export default function Login({ isOpen, onClose }) {
    
    const [useEmail, setUseEmail] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
    
        return () => {
          document.body.style.overflow = "auto";
        };
      }, [isOpen]);

      const handleClose = () => {
        setShowRegister(false);
        setUseEmail(false);
        onClose();
      };
    
      if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000050] backdrop-blur-sm">
        
      <div className="bg-white rounded-xl shadow-xl p-7 w-[500px] max-w-full relative text-center font-roboto">
      <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black cursor-pointer"
        >
          <X />
        </button>

        {showRegister ? (
          <Register/>
        ) : (
          <>
        <img
          src="/images/logo-removebg-preview.png"
          alt="לוגו"
          className="w-82 mx-auto -mt-10"
        />
        <h2 className="text-2xl font-bold text-green-900 -mt-10">כיף לראות אתכם שוב!</h2>
        <h3 className="text-xl font-bold text-green-900 mb-6 "> {useEmail
            ? "אנא הזינו כתובת מייל כדי להתחבר לחשבונכם."
            : "אנא הזינו מספר נייד כדי להתחבר לחשבונכם."}
          <br />
          אם עדיין לא נרשמתם, תועברו ישירות לעמוד הרשמה.</h3>


        <input
           type={useEmail ? "email" : "phone"}
           placeholder={useEmail ? "מייל..." : "נייד..."}
          className="w-full border border-gray-300 rounded-md p-4 mb-4 text-right "
        />

        <button  onClick={() => setShowRegister(true)}
 className="w-full text-md bg-green-900 text-white py-2 rounded-md font-bold hover:bg-green-800 pointer-cursor">
          שליחה
        </button>
        
        <p className="mt-4 text-">
        {useEmail ? "לחזור להזנת נייד?" : "לשלוח למייל במקום?"}{" "}
        <button
            onClick={() => setUseEmail(!useEmail)}
            className="text-green-900 underline font-bold pointer-cursor"
            >
            לחצו כאן
          </button>
        </p>
        </>
)}
      </div> 
    </div>
  );
}
