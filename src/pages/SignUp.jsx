import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import OtpPopup from "../components/OtpPopup";

const SignUp = () => {
  const [showOtp, setShowOtp] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <>
      <LoginForm
        onOtpSent={(sid, phoneNumber) => {
          setSessionId(sid);
          setPhone(phoneNumber);
          setShowOtp(true);
        }}
      />

      {showOtp && (
        <OtpPopup
          phone={phone}
          sessionId={sessionId}
          onSuccess={() => {
            window.location.href = "/user-details";
          }}
        />
      )}
    </>
  );
};

export default SignUp;
