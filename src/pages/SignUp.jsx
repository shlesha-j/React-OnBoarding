import React, { useState } from "react";
import LoginForm from "../components/LoginForm/LoginForm";
import OtpPopup from "../components/otpPopup/OtpPopup";

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
        <div className="otp-overlay">
          <OtpPopup
            phone={phone}
            sessionId={sessionId}
            onSuccess={() => {
              window.location.href = "/user-details";
            }}
            onClose={() => setShowOtp(false)}  
          />
        </div>
      )}

    </>
  );
};

export default SignUp;
