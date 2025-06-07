"use client";

import { useState } from "react";
import Shipping from "./Shipping";
import Checkout from "./Checkout";
import { useApp } from "@/context/AppContext";

export default function OrderFlow() {
  const [showShipping, setShowShipping] = useState(true);
  const [showCheckout, setShowCheckout] = useState(false);
    const { closeShippingFlow } = useApp();

  const handleShippingSubmit = () => {
    setShowShipping(false);
    setShowCheckout(true);
  };

  const handleClose = () => {
    closeShippingFlow();
    setShowShipping(true);
    setShowCheckout(false);
  };

    return (
    <>
      {showShipping && (
        <Shipping onClose={handleClose} onSubmit={handleShippingSubmit} />
      )}

      {showCheckout && (
        <Checkout onClose={handleClose} />
      )}
    </>
  );
}