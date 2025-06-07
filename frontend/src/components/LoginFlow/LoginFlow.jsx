"use client";

import { useState } from "react";
import LoginModal from "./LoginModal";
import VerifyModal from "./VerifyModal";
import RegisterModal from "./RegisterModal";

export default function LoginFlow({ onCloseAll }) {
  const [step, setStep] = useState("login"); // 'login' | 'verify' | 'register'
  const [phone, setPhone] = useState("");

  const handleGoToVerify = (phoneNumber) => {
    setPhone(phoneNumber);
    setStep("verify");
  };

  const handleGoToRegister = (phoneNumber) => {
    setPhone(phoneNumber);
    setStep("register");
  };

  const handleClose = () => {
    onCloseAll();
    setStep("login");
    setPhone("");
  };

  return (
    <>
      {step === "login" && (
        <LoginModal
          onClose={handleClose}
          onGoToVerify={handleGoToVerify}
          onGoToRegister={handleGoToRegister}
        />
      )}

      {step === "verify" && (
        <VerifyModal phone={phone} onClose={handleClose} />
      )}

      {step === "register" && (
        <RegisterModal phone={phone} onClose={handleClose} onGoToVerify={handleGoToVerify}/>
      )}
    </>
  );
}
