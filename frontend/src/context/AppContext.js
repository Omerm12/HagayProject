"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const AppContext = createContext();
export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const { data: session, status } = useSession();

  const user = {
    id: session?.user?.id || null,
    phone: session?.user?.phone || null,
    email: session?.user?.email || null,
    isLoggedIn: !!session?.user?.id,
  };

  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [settlements, setSettlements] = useState([]);
  const [selectedSettlement, setSelectedSettlement] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [checkoutDetails, setCheckoutDetails] = useState({
    fullName: "",
    phone: "",
    email: "",
    city: "",
    street: "",
    houseNumber: "",
    floor: "",
    notes: "",
  });
  const [discountCode, setDiscountCode] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [adminView, setAdminView] = useState(false);
  const [shippingDetails, setShippingDetails] = useState(null);
  const [isShippingOpen, setIsShippingOpen] = useState(false);
  const [isLoginFlowOpen, setIsLoginFlowOpen] = useState(false);

  const fetchCart = async () => {
    try {
      if (!user.id) return;
      const res = await fetch(`http://localhost:5000/api/cart?user_id=${user.id}`);
      if (!res.ok) throw new Error(`שגיאה בשרת: ${res.status}`);
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("התשובה מהשרת אינה מערך");
      setCart(data);
      const sum = data.reduce((acc, item) => acc + parseFloat(item.price_per_unit) * item.quantity, 0);
      setTotal(sum);
    } catch (err) {
      console.error("שגיאה בשליפת עגלה:", err);
    }
  };

  const fetchSettlements = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/settlements");
      if (!res.ok) throw new Error(`שגיאה בשרת: ${res.status}`);
      const data = await res.json();
      setSettlements(data);
    } catch (err) {
      console.error("שגיאה בשליפת ישובים:", err);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const res = await fetch("http://localhost:5000/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, product_id: productId, quantity }),
      });

      const text = await res.text();
      try {
        const data = JSON.parse(text);
        if (!res.ok) throw new Error(data.error || "שגיאה בהוספת מוצר לעגלה");
      } catch (jsonErr) {
        console.error("תגובת שרת לא תקינה (לא JSON):", text);
        throw new Error("תגובת שרת לא תקינה");
      }

      await fetchCart();
    } catch (err) {
      console.error("שגיאה בהוספה לעגלה:", err);
    }
  };

  const updateCartItem = async (productId, quantity) => {
    try {
      await fetch("http://localhost:5000/api/cart/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, product_id: productId, quantity }),
      });
      await fetchCart();
    } catch (err) {
      console.error("שגיאה בעדכון פריט:", err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await fetch("http://localhost:5000/api/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, product_id: productId }),
      });
      await fetchCart();
    } catch (err) {
      console.error("שגיאה במחיקה מהעגלה:", err);
    }
  };

  const saveShippingDetails = (details) => {
    setShippingDetails(details);
  };

  const clearCart = async () => {
  try {
    await fetch("http://localhost:5000/api/cart/clear", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id }),
    });
    await fetchCart();
  } catch (err) {
    console.error("שגיאה בניקוי סל:", err);
  }
};

 const openShippingFlow = () => setIsShippingOpen(true);
  const closeShippingFlow = () => setIsShippingOpen(false);


  useEffect(() => {
    if (user.id) fetchCart();
  }, [user.id]);

  useEffect(() => {
    fetchSettlements();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        cart,
        total,
        fetchCart,
        addToCart,
        updateCartItem,
        removeFromCart,
        settlements,
        selectedSettlement,
        setSelectedSettlement,
        paymentStatus,
        setPaymentStatus,
        paymentMethod,
        setPaymentMethod,
        checkoutDetails,
        setCheckoutDetails,
        discountCode,
        setDiscountCode,
        discountAmount,
        setDiscountAmount,
        showLoginModal,
        setShowLoginModal,
        adminView,
        setAdminView,
        saveShippingDetails,
        shippingDetails,
        clearCart,
         isShippingOpen,
        openShippingFlow,
        closeShippingFlow,
        isLoginFlowOpen,
        setIsLoginFlowOpen, 
      }}>
      {children}
    </AppContext.Provider>
  );
};
