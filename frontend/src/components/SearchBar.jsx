"use client";
import { useState, useEffect } from "react";
import { Search, X, Plus, Minus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useApp } from "@/context/AppContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function SearchBar({ autoFocus = false }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: session } = useSession();
  const { cart, addToCart, removeFromCart, setIsLoginFlowOpen } = useApp();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length > 0) {
        fetch(`${API_URL}/api/products/search?q=${encodeURIComponent(query)}`)
          .then((res) => res.json())
          .then((data) => {
            setResults(data);
            setShowDropdown(true);
          })
          .catch(console.error);
      } else {
        setShowDropdown(false);
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const highlightMatch = (text) => {
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, `<mark class="bg-yellow-200 font-bold">$1</mark>`);
  };

  const handleProtectedCartAction = (actionFn) => {
    if (session?.user) {
      actionFn();
    } else {
      localStorage.setItem("redirectAfterLogin", window.location.href);
      setIsLoginFlowOpen(true);
    }
  };

  return (
    <div className="relative w-full text-right">
      {/* שורת החיפוש */}
      <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 shadow w-full">
        {query && (
          <X className="w-4 h-4 text-gray-500 ml-2 cursor-pointer" onClick={() => setQuery("")} />
        )}
        <input
          type="text"
          className="w-full outline-none text-right text-sm sm:text-base"
          placeholder="מה מחפשים?"
          autoFocus={autoFocus}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          dir="rtl"
        />
        <Search className="w-4 h-4 text-green-800 ml-2 cursor-pointer" />
      </div>

      {/* תוצאות חיפוש */}
      {showDropdown && results.length > 0 && (
        <div className="absolute bg-white w-full sm:w-[450px] right-0 mt-2 rounded-md shadow-lg z-50 border text-right max-h-[70vh] overflow-y-auto">
          <ul className="divide-y">
            {results.map((product) => {
              const quantity = cart.find((c) => c.product_id === product.id)?.quantity || 0;

              return (
                <li
                  key={product.id}
                  className="flex items-center justify-between gap-2 px-4 py-3 hover:bg-gray-50"
                >
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="w-12 h-12 object-contain rounded-md"
                  />
                  <div className="flex-1 text-right">
                    <div
                      className="font-bold text-sm"
                      dangerouslySetInnerHTML={{ __html: highlightMatch(product.title) }}
                    />
                    <div className="text-gray-600 text-sm">₪{product.price_per_unit}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() =>
                        handleProtectedCartAction(() => removeFromCart(product.id))
                      }
                      className="bg-green-100 hover:bg-green-200 text-green-700 rounded-full p-1"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-sm font-bold w-6 text-center">{quantity}</span>
                    <button
                      onClick={() => handleProtectedCartAction(() => addToCart(product.id))}
                      className="bg-green-500 hover:bg-green-600 text-white rounded-full p-1"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
