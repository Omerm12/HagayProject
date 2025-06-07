"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation"; 
import RestoreLastOrderButton from "./RestoreLastOrderButton";
import { useApp } from "@/context/AppContext";

export default function SideMenu({ onClose }) {
  const ref = useRef();
  const { data: session } = useSession();
const router = useRouter();
  const { isLoginFlowOpen, setIsLoginFlowOpen } = useApp();


useEffect(() => {
  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      onClose();
    }
  };
  document.addEventListener("click", handleClickOutside); // ✅ שונה מ־mousedown ל־click
  return () => document.removeEventListener("click", handleClickOutside);
}, [onClose]);

  const handleScrollToContact = () => {
    onClose();
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 100);
  };

  
  const handleProtectedLinkClick = (href) => {
    if (session?.user) {
      onClose();
      setTimeout(() => {
        router.push(href); 
      }, 50);
    } else {
      localStorage.setItem("redirectAfterLogin", href);
      setIsLoginFlowOpen(true);
      onClose();
    }
  };

  return (
    <div
      ref={ref}
      className="absolute top-12 right-2 bg-white shadow-xl border rounded-xl p-5 w-72 z-50 animate-fade-in text-green-900 sm:translate-x-[125px]"
      dir="rtl"
    >
      <nav className="flex flex-col gap-4 text-base font-medium">
        
        {/* קטגוריות מובייל */}
        <Link href="/" onClick={onClose}>🏠 דף הבית</Link>
        <Link href="/vegetables" onClick={onClose}>🥬 ירקות</Link>
        <Link href="/fruits" onClick={onClose}>🍎 פירות</Link>
        <Link href="#" onClick={onClose}>💚 בריאות</Link>

        <hr className="border-t border-gray-200 my-2" />
                <Link href="/locations" onClick={onClose}>📍 אזורי משלוח</Link>
 <button onClick={() => handleProtectedLinkClick("/orders")} className="text-right cursor-pointer">
          🛒 ההזמנות שלי
        </button>
        <button onClick={() => handleProtectedLinkClick("/favorites")} className="text-right cursor-pointer">
          ❤️ המועדפים
        </button>
        <button onClick={() => handleProtectedLinkClick("/account")} className="text-right cursor-pointer">
          👤 חשבון
        </button>
        {/* כפתור צור קשר */}
        <button className="cursor-pointer text-right text-green-800" onClick={handleScrollToContact}>
          📞 צור קשר
        </button>

        {/* כפתור התחברות / התנתקות - רק מובייל */}
        <div className="sm:hidden flex flex-col items-center gap-3 pt-2">
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
        </div>

        {/* כפתור שחזור הזמנה - רק מובייל ממורכז */}
        <div className="sm:hidden flex justify-center">
          <RestoreLastOrderButton />
        </div>
      </nav>
    </div>
  );
}
