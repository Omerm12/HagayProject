"use client";

import React from "react";
import { X } from "lucide-react";

export default function Register() {
  return (
<>
              <img
                src="/images/logo-removebg-preview.png"
                alt="לוגו"
                className="w-82 mx-auto -mt-10"
              />
         <h2 className="text-2xl font-bold text-green-900 -mt-10">ברוכים הבאים!</h2>

        {/* טופס */}
        <form className="space-y-4 text-right">
          <div>
            <label className="block text-sm font-bold text-green-900 mb-1">שם מלא *</label>
            <input
              type="text"
              placeholder=""
              className="w-full border border-gray-300 rounded-md p-3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-green-900 mb-1">נייד *</label>
            <input
              type="text"
              placeholder=""
              className="w-full border border-gray-300 rounded-md p-3"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-green-900 mb-1">מייל *</label>
            <input
              type="email"
              placeholder=""
              className="w-full border border-gray-300 rounded-md p-3"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-md bg-green-900 text-white py-2 rounded-md font-bold hover:bg-green-800 pointer-cursor">
          
            הרשמה
          </button>
        </form>
      </>
  );
}
