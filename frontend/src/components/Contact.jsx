"use client";

import React, { useState } from 'react';
import { usePathname, useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL 

export default function Contact() {
  const pathname = usePathname();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, phone, message }),
      });

      if (res.ok) {
        setSuccessMsg("ההודעה נשלחה בהצלחה!");
        setFullName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setSuccessMsg("אירעה שגיאה בשליחה.");
      }
    } catch (err) {
      setSuccessMsg("שגיאה בשרת.");
    }
  };

  return (
    <footer className="text-white px-6 pt-6 pb-3 bg-[url('/images/footerBackground1.png')] bg-cover bg-center">
      <div    
        className="w-50 h-50 bg-white rounded-full shadow-lg absolute -mt-27 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center overflow-hidden"
      >
        <img
          src="/images/logo-removebg-preview.png"
          alt="לוגו"
          className="w-full h-full object-contain scale-180"
        />
      </div>

      <div className="max-w-9xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10 mt-36 items-start text-right font-roboto text-white px-6">
        {/* פרטים */}
        <div className="mt-20 space-y-6 order-1 lg:order-1 lg:pr-8">
          <h2 className="text-4xl font-bold text-white flex items-center justify-center">
            אנו מזמינים אתכם לפנות לשירות הלקוחות שלנו בכל שאלה או בקשה
          </h2>
          <p className="text-2xl flex items-center justify-center">
            שירות הלקוחות שלנו זמין וזמין בשבילכם, בימים א'-ה' מ־7:00 עד 22:00 וברביעי עד 14:00.
          </p>
          <div className="flex flex-col items-center text-2xl text-white gap-4 mt-8">
            <div className="flex items-center gap-2">
              <img src="/images/gmail.png" alt="gmail" className="w-6 h-6" />
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=omermadhala181@gmail.com&su=פנייה מהאתר"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                omermadhala181@gmail.com
              </a>
            </div>

            <div className="flex gap-8 flex-wrap justify-center">
              <div className="flex items-center gap-2">
                <img src="/images/phone.png" alt="phone" className="w-6 h-6" />
                <a href="tel:0504083515" className="hover:underline">050-4083515</a>
              </div>
              <div className="flex items-center gap-2">
                <img src="/images/whatsapp.png" alt="whatsapp" className="w-6 h-6" />
                <a href="https://wa.me/972504083515" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  050-4083515
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* טופס פנייה */}
        <div className="p-6 rounded-md space-y-4 text-white order-2 lg:order-2 font-bold">
          <h3 className="text-2xl font-bold">אפשר גם למלא טופס פנייה ונענה במהירות :)</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
            <input
              type="text"
              placeholder="שם מלא *"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="border border-gray-300 bg-white rounded-md p-2 w-full text-right col-span-2"
            />
            <input
              type="email"
              placeholder="מייל *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 bg-white rounded-md p-2 w-full text-right col-span-2"
            />
            <input
              type="text"
              placeholder="נייד *"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border border-gray-300 bg-white rounded-md p-2 w-full text-right col-span-2"
            />
            <textarea
              placeholder="ההודעה שלכם ..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border border-gray-300 bg-white rounded-md p-2 w-full text-right col-span-2"
              rows="4"
            />
            <button type="submit" className="bg-green-900 text-white px-6 py-3 rounded-md w-full font-bold hover:bg-green-800 col-span-2">
              שליחה
            </button>
          </form>
          {successMsg && <p className="text-white mt-2 text-center col-span-2">{successMsg}</p>}
        </div>
      </div>

      <div className="w-full border-y-4 border-[#F6E8CA] text-white text-center py-3 mt-8 mb-3">
        <p className="text-md font-bold">
          כל הזכויות שמורות ל-משק 22 בע"מ. חנות המשק שלנו נמצאת במושב ינון במשק 22
        </p>
      </div>
    </footer>
  );
}
