"use client";

import React, { useState, useEffect } from "react";
import ItemCard from "@/components/ItemCard";
import { useApp } from "@/context/AppContext";

const ITEMS_PER_PAGE = 15;
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function FavoritesPage() {
  const { user } = useApp();
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!user?.id) return;

      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/favorites/user/${user.id}`);
        const data = await res.json();

        if (Array.isArray(data)) {
          setFavorites(data);
        } else {
          console.error("Invalid favorites data format:", data);
        }
      } catch (err) {
        console.error("Failed to load favorites:", err);
      }
      setLoading(false);
    };

    load();
  }, [user?.id]);

  const totalPages = Math.ceil(favorites.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = favorites.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const scrollToTopThenSetPage = (newPage) => {
  const onScroll = () => {
    if (window.scrollY === 0) {
      setCurrentPage(newPage);
      window.removeEventListener("scroll", onScroll);
    }
  };

  window.addEventListener("scroll", onScroll);
  window.scrollTo({ top: 0, behavior: "smooth" });
};

  const handleNextPage = () => {
  if (currentPage < totalPages) {
    scrollToTopThenSetPage(currentPage + 1);
  }
};

const handlePrevPage = () => {
  if (currentPage > 1) {
    scrollToTopThenSetPage(currentPage - 1);
  }
};
  return (
    <div className="min-h-screen bg-[#F6E8CA] px-4 py-10 font-georgia flex flex-col items-center">
      <div className="text-center mt-20 max-w-3xl">
        <h1 className="text-6xl font-extrabold text-green-700  mb-4">המועדפים שלי 💚</h1>
      </div>
      
       {loading ? (
        <p className="text-xl mt-10">טוען מוצרים...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-x-2 gap-y-10 mt-16 w-full px-4">
  {currentItems.map((item) => (
    <ItemCard key={item.id} item={item}   onRemoveFromFavorites={(removedId) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== removedId));
  }}/>
  ))}
</div>
      )}

      {favorites.length > ITEMS_PER_PAGE && (
        <div dir="ltr" className="mt-10 mb-24 flex gap-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            הקודם
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            הבא
          </button>
        </div>
      )}
    </div>
  );
}
