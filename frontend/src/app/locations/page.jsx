"use client";
import { useEffect, useState } from "react";

export default function Locations() {
  const [settlements, setSettlements] = useState([]);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/settlements")
      .then((res) => res.json())
      .then((data) =>
        setSettlements(
          data.map((item) => ({
            ...item,
            name: item.name.trim().toLowerCase(),
          }))
        )
      )
      .catch(console.error);
  }, []);

  const handleCheck = () => {
    const userInput = query.trim().toLowerCase();
    const found = settlements.find((zone) => zone.name === userInput);
    setResult(!!found);
  };

  return (
    <main
      className="min-h-screen text-green-900 p-6 flex flex-col items-center justify-center"
      dir="rtl"
    >
      {/* כותרת מעוצבת */}
      <div className="mb-8 text-center px-4">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-green-800 mb-2">
          בדיקת זמינות משלוח
        </h1>
        <p className="text-base sm:text-xl font-medium text-gray-800">
          בחר יישוב מהרשימה או הקלד כדי לבדוק אם אנחנו מגיעים אליך 🚚
        </p>
      </div>

      {/* שדה קלט + כפתור */}
      <div className="flex flex-col-reverse sm:flex-row items-center gap-4 w-full max-w-xl">
        {/* כפתור */}
        <button
          onClick={handleCheck}
          className="bg-green-600 text-white px-6 py-3 rounded font-bold w-full sm:w-auto hover:bg-green-700 transition-colors"
        >
          בדיקה
        </button>

        {/* קלט */}
        <input
          list="settlement-list"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="הקלד או בחר יישוב"
          className="text-right bg-white w-full border border-gray-300 p-4 rounded-md shadow-sm placeholder:text-gray-400"
        />
        <datalist id="settlement-list">
          {settlements.map((s, i) => (
            <option key={i} value={s.name} />
          ))}
        </datalist>
      </div>

      {/* תוצאה */}
      {result !== null && (
        <div className="mt-10 text-center text-xl sm:text-2xl font-bold px-4">
          {result ? (
            <div className="text-green-700">
              ✅ איזה כיף, אנחנו מגיעים אליך!
            </div>
          ) : (
            <div className="text-red-600">
              ❌ אנחנו עדיין לא מגיעים אליך, אבל נשמח בעתיד הקרוב
            </div>
          )}
        </div>
      )}
    </main>
  );
}
