"use client";

import React, { useRef } from 'react';
import Deals from '@/entities/Deals';
import ItemCard from '@/components/ItemCard'; 
import { Plus, ChevronLeft, ChevronRight, Minus } from 'lucide-react';
import Recommended from '@/entities/Recommended';

function Home() {

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' });
    }
  };

  const products = [
    {
      title: 'סלרי',
      image: '/images/6ae4954a-6af0-4ee9-87d8-769d483de9ab.png',
      price: 6,
      badge: 'במבצע 3 ב-12 ₪',
    },
    {
      title: 'סלרי',
      image: '/images/6ae4954a-6af0-4ee9-87d8-769d483de9ab.png',
      price: 6,
      badge: 'במבצע 3 ב-12 ₪',
    },
    {
      title: 'סלרי',
      image: '/images/6ae4954a-6af0-4ee9-87d8-769d483de9ab.png',
      price: 6,
      badge: 'במבצע 3 ב-12 ₪',
    },
    {
      title: 'כרוב סגול',
      image: '/images/5893882d-2976-4d63-8046-e6212c6204f0.png',
      price: 5,
      badge: 'במבצע 3 ב-10 ₪',
    },
    {
      title: 'בצל לבן',
      image: '/images/6ae4954a-6af0-4ee9-87d8-769d483de9ab.png',
      price: 5.9,
      unit: 'ק"ג',
    },
    {
      title: 'מלפפון',
      image: '/images/5893882d-2976-4d63-8046-e6212c6204f0.png',
      price: 8.9,
      unit: 'ק"ג',
    },
  ];

   return (
    <div dir="ltr" className="min-h-screen bg-[#F6E8CA] px-4 py-10 overflow-x-hidden">
      {/* תוכן ראשי */}
      <div className="font-georgia mt-46 lg:mt-12 max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-10 mb-16 px-4">
        <div className="lg:w-1/2 rounded-xl p-4 text-right lg:mr-10">
          <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-2">
            משלוחים למגוון אזורים בארץ
          </h2>
          <h1 className="font-georgia text-3xl md:text-5xl text-green-900 mb-6">
            איכות, טריות, בריאות – בשביל זה אנחנו כאן
          </h1>
          <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
            אנו משפחת משק 22, ממושב שדה עוזיהו, מחזיקים משק חקלאי שעובר בדורות כבר 50 שנה<br />
            כיום, אנו מתמחים בגידול כל סוגי החסות, עגבניות חממה בגידול הידרופוני , ברוקולי, בצל, כרוב לבן ואדום, סלרי וסלק עלים<br />
            לפי כ-6 שנים האיכר משק 22, שמעון, החליט לפתוח חנות משק לפירות וירקות ברמת פרימיום <br />
            כיום, אנו מגיעים למגוון רחב של אזורים ברחבי הארץ עם התוצרת הטרייה, בריאה ואיכותית שלנו<br />
            <span className="font-bold text-green-900">נשמח לתת לכם שירות בחנות ובאונליין</span>
          </p>
        </div>

        <div className="lg:w-1/2 w-full flex justify-center">
          <div className="rounded-fullד overflow-hidden w-[70vw] sm:w-[90vw] max-w-[550px] h-[70vw] sm:h-[90vw] max-h-[550px] mb-5">
            <img
              src="/images/veg.png"
              alt="חסה"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>

       {/* מומלצים */}
      <div className="max-w-[1540px] mx-auto relative font-roboto">
      <Deals products={products} />
      </div>

       {/* מבצעים */}
       <div className="mt-25 mb-45">
        <Recommended products={products} />
</div>
    </div>
  );
}

export default Home;
