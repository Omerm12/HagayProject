"use client";

import React, { useState } from "react";
import Link from "next/link";
import Cart from "./Cart";
import SearchBar from "./SearchBar";
import LoginFlow from "./LoginFlow/LoginFlow";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { useApp } from "@/context/AppContext";
import SideMenu from "./SideMenu";
import RestoreLastOrderButton from "./RestoreLastOrderButton";

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const {  isLoginFlowOpen, setIsLoginFlowOpen,cart, total, user } = useApp();

  let headerImage = "/images/headerPhoto.png";
  if (pathname.includes("/fruits")) {
    headerImage = "/images/fruitNav.png";
  }

  return (
    <header dir="rtl" className="relative w-full">
      {/* תמונת רקע עליונה */}
      <img
        src={headerImage}
        alt="Header Background"
        className="w-full h-[250px] sm:h-[350px] object-cover"
      />

     {/* ✅ מובייל בלבד */}
<div className="block sm:hidden relative z-10">
  {/* פס לבן מעוגל */}
  <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-white rounded-full shadow-md px-4 py-3 flex items-center justify-between mt-2 z-40">
    <div className="flex items-center gap-2">
      {isMenuOpen ? (
        <X className="text-green-900 cursor-pointer" onClick={() => setIsMenuOpen(false)} />
      ) : (
        <Menu className="text-green-900 cursor-pointer" onClick={() => setIsMenuOpen(true)} />
      )}
{isMenuOpen && (
  <SideMenu
    onClose={() => setIsMenuOpen(false)}
    setIsLoginFlowOpen={setIsLoginFlowOpen} // ✅ מעביר את הפונקציה כ־prop
  />
)}
      {/* אייקון פתיחת חיפוש */}
      <button
        onClick={() => setIsSearchOpen(true)}
        className=" p-2 rounded-full"
      >
        <Search className="text-green-800" size={20} />
      </button>
    </div>

    {/* עגלת קניות */}
    <div
      onClick={() => setIsCartOpen(true)}
      className="flex items-center bg-orange-400 text-white px-2 py-1 rounded-full cursor-pointer gap-1"
    >
      <ShoppingCart size={18} />
      <span className="bg-white text-orange-400 font-bold px-3 py-1 rounded-full text-sm">
        ₪ {(user?.id ? total : 0).toFixed(2)}
      </span>
    </div>
  </div>

  {/* לוגו */}
{pathname === "/" && (
  <div className="block sm:hidden absolute top-[10px] left-1/2 -translate-x-1/2 w-44 h-44 bg-white rounded-full shadow-lg flex items-center justify-center overflow-hidden z-10">
    <img
      src="/images/logo-removebg-preview.png"
      alt="לוגו"
      className="w-full h-full object-contain scale-175"
    />
  </div>
)}

  {/* מודאל חיפוש */}
  {isSearchOpen && (
  <div className="fixed inset-0 bg-black/50 z-50">
    <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-full max-w-sm px-4">
      <div className="bg-white rounded-xl p-4 relative shadow-lg">
        <button
          className="absolute top-1 right-1 text-gray-600"
          onClick={() => setIsSearchOpen(false)}
        >
          <X size={20} />
        </button>
        <div className="mt-3">
  <SearchBar  />
</div>
      </div>
    </div>
  </div>
  )}
</div>

      {/* ✅ דסקטופ בלבד - כל מה ששלחת נשמר בדיוק */}
      <div className="hidden sm:block absolute inset-0">
        <div className="flex flex-col md:flex-row justify-between items-center px-4 sm:px-18 py-4 mt-5 gap-4">
        <div className="flex items-center rounded-full px-4 py-2 w-full max-w-xs shadow-md mt-2">
          <SearchBar autoFocus={false} />
          </div>

          <div className="flex flex-col sm:flex-col items-center gap-3">
            {session?.user ? (
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="bg-white text-red-600 px-4 py-2 rounded-full shadow hover:bg-red-50 w-[220px]"
              >
                התנתק
              </button>
            ) : (
              <button
                onClick={() => setIsLoginFlowOpen(true)}
                className="flex items-center justify-center gap-2 bg-white text-green-900 px-4 py-2 rounded-full shadow hover:bg-green-50 w-[220px] cursor-pointer"
              >
                <span className="font-bold">התחברות / הרשמה</span>
              </button>
            )}
            <RestoreLastOrderButton />
          </div>
        </div>

        <nav
          dir="rtl"
          className="font-georgia relative flex items-center justify-between mt-6 bg-white shadow px-6 py-1.5 rounded-full w-full max-w-screen-sm mx-auto z-10"
        >
          <div className="flex items-center gap-4 relative">
            <div className="flex items-center gap-4 relative">
              {isMenuOpen ? (
                <X
                  className="text-green-900 cursor-pointer"
                  onClick={() => setIsMenuOpen(false)}
                />
              ) : (
                <Menu
                  className="text-green-900 cursor-pointer"
                  onClick={() => setIsMenuOpen(true)}
                />
              )}
{isMenuOpen && (
  <SideMenu
    onClose={() => setIsMenuOpen(false)}
    setIsLoginFlowOpen={setIsLoginFlowOpen} // ✅ מעביר את הפונקציה כ־prop
  />
)}            </div>
          </div>

          <div className="flex items-center gap-5 text-gray-800 font-semibold text-2xl flex-1 justify-center relative">
            <Link href="/vegetables" className="cursor-pointer">ירקות</Link>
            <span className="w-px h-6 bg-gray-300 inline-block"></span>
            <Link href="/fruits" className="cursor-pointer">פירות</Link>
            <span className="w-px h-6 bg-gray-300 inline-block"></span>
            <span className="cursor-pointer">בריאות</span>
          </div>

          <div
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 bg-orange-400 text-white px-4 py-2 rounded-full cursor-pointer"
          >
            <span className="text-xl">הסל שלי</span>
            <ShoppingCart size={20} />
            <span className="bg-white text-orange-400 font-bold px-2 py-1 rounded-full text-sm">
              ₪ {(user?.id ? total : 0).toFixed(2)}
            </span>
          </div>
        </nav>

        {/* לוגו במרכז */}
        <Link href="/" passHref>
          <div className="w-50 h-50 bg-white rounded-full shadow-lg absolute mt-3 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center overflow-hidden cursor-pointer">
            <img
              src="/images/logo-removebg-preview.png"
              alt="לוגו"
              className="w-full h-full object-contain scale-180"
            />
          </div>
        </Link>
      </div>

      {/* מודלים */}
      {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
      {isLoginFlowOpen && <LoginFlow onCloseAll={() => setIsLoginFlowOpen(false)} />}
    </header>
  );
}
