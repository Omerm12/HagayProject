"use client";

"use client";
import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AccountPage() {
  const { user, setUser } = useApp();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    if (!user) return;
    fetch(`${API_URL}/api/users/by-phone/${user.phone}`)
      .then((res) => res.json())
      .then((data) => {
        setFullName(data.full_name || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setLoading(false);
      })
      .catch((err) => {
        console.error("שגיאה בטעינת פרטי משתמש:", err);
        setLoading(false);
      });
  }, [user]);

  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch(`${API_URL}/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name: fullName, email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      setMessage("הפרטים עודכנו בהצלחה!");
      setUser(data);
    } catch (err) {
      setMessage(err.message || "שגיאה בעדכון הפרטים");
    }
  };

  const handleSendOtp = async () => {
    setMessage("");
    try {
      const res = await fetch(`${API_URL}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: newPhone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setOtpSent(true);
      setMessage("קוד נשלח למספר החדש");
    } catch (err) {
      setMessage(err.message || "שגיאה בשליחת הקוד");
    }
  };

  const handleVerifyAndUpdatePhone = async () => {
    setMessage("");
    try {
      const res = await fetch(`${API_URL}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: newPhone, code: otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      const updateRes = await fetch(`${API_URL}/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: newPhone }),
      });

      const updatedUser = await updateRes.json();
      if (!updateRes.ok) throw new Error(updatedUser.error);

      setPhone(newPhone);
      setUser(updatedUser);
      setNewPhone("");
      setOtp("");
      setOtpSent(false);
      setMessage("מספר הטלפון עודכן בהצלחה!");
    } catch (err) {
      setMessage(err.message || "שגיאה באימות הקוד");
    }
  };

  if (!user) return <div className="p-10 text-center text-xl">יש להתחבר כדי לצפות בפרטי החשבון.</div>;

  return (
    <div className="min-h-screen bg-[#F6E8CA] flex justify-center items-center py-16 font-georgia">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-300 ">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">פרטי חשבון</h1>

        {loading ? (
          <p>טוען פרטים...</p>
        ) : (
          <>
            <form onSubmit={handleUpdateDetails} className="space-y-4">
              <div>
                <label className="block font-semibold text-right mb-1">שם מלא</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block font-semibold text-right mb-1">אימייל</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              <div>
                <label className="block font-semibold text-right mb-1">מספר טלפון נוכחי</label>
                <input
                  type="text"
                  value={phone}
                  disabled
                  className="w-full p-2 border border-gray-200 bg-gray-100 text-gray-500 rounded"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-bold"
              >
                עדכון פרטים
              </button>
            </form>

            <hr className="my-6" />

            <div className="space-y-4">
              <label className="block font-semibold text-right mb-1">מספר טלפון חדש</label>
              <input
                type="text"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />

              {!otpSent ? (
                <button
                  onClick={handleSendOtp}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-bold"
                >
                  שלח קוד אימות
                </button>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="הזן קוד אימות"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                  <button
                    onClick={handleVerifyAndUpdatePhone}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-bold"
                  >
                    אשר ועדכן טלפון
                  </button>
                </>
              )}
            </div>

            {message && <p className="text-center text-sm text-green-700 mt-4">{message}</p>}
          </>
        )}
      </div>
    </div>
  );
}
