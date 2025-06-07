"use client";

import React from 'react';
import { usePathname, useRouter } from "next/navigation";


export default function Footer() {

  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();

    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/").then(() => {
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100); 
      });
    }
  };

  return (
    <footer
      className="text-white px-6 pt-6 pb-3 bg-[url('/images/footerBackground1.png')] bg-cover bg-center"
    >  <a
    href="/"
    onClick={handleClick}
    className="w-50 h-50 bg-white rounded-full shadow-lg absolute -mt-27 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center overflow-hidden cursor-pointer"
  >
    <img
      src="/images/logo-removebg-preview.png"
      alt="לוגו"
      className="w-full h-full object-contain scale-180"
    />
  </a>

      {/* תוכן עמודות */}
      <div className="mt-36 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-right font-[Rubik]">
        {/* מידע */}
        <div>
          <h3 className="text-xl font-bold mb-4">מידע</h3>
          <ul className="space-y-2">
            <li>אודותינו</li>
            <li>שאלות ותשובות</li>
            <li>משלוחים והזמנות</li>
            <li>צור קשר</li>
            <li>הצהרת נגישות</li>
            <li>מדיניות פרטיות</li>
            <li>תקנון</li>
          </ul>
        </div>

        {/* שירות לקוחות */}
        <div>
          <h3 className="text-xl font-bold mb-4">שירות לקוחות</h3>
          <ul className="space-y-2">
            <li>צור קשר</li>
            <li>החשבון שלי</li>
            <li>עדכון כתובת</li>
            <li>הזמנה מחודשת</li>
            <li>ההזמנות שלי</li>
            <li>תנאי שימוש</li>
          </ul>
        </div>

        {/* קטגוריות מומלצות */}
        <div>
          <h3 className="text-xl font-bold mb-4">קטגוריות מומלצות</h3>
          <ul className="space-y-2">
            <li>מבצעי השבוע</li>
            <li>ירקות</li>
            <li>פירות</li>
            <li>תבלינים</li>
            <li>פיצוחים</li>
            <li>פירות יבשים</li>
            <li>חסות, עלים, עשבי תיבול ופטריות</li>
          </ul>
        </div>

        {/* משלוחים */}
        <div>
          <h3 className="text-xl font-bold mb-4">משלוחים</h3>
          <ul className="space-y-2">
            <li>אזורי משלוח וזמני הגעה</li>
            <li>משלוחי פירות וירקות לתל אביב</li>
            <li>משלוחי פירות וירקות למודיעין-מכבים-רעות</li>
            <li>משלוחי פירות וירקות לראשון לציון</li>
            <li>עלויות משלוח</li>
          </ul>
        </div>
      </div>

      {/* קרדיט לרוחב מלא */}
<div className="w-full border-y-4 border-[#F6E8CA] text-white text-center py-3 mt-8 mb-3">
  <p className="text-md font-bold">
    כל הזכויות שמורות ל-משק 22 בע"מ. חנות המשק שלנו נמצאת במושב ינון במשק 22
  </p>
</div>
    </footer>
  );
}
