import React, { useState } from "react";
import { verifyOtp } from "../api/otp";

const OtpPopup = ({ phone, sessionId, onSuccess }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async () => {
    const ok = await verifyOtp(sessionId, otp);
    if (ok) onSuccess();
    else setError("Incorrect OTP");
  };

  return (
    <div className="otp-popup">
      <h3>Enter OTP sent to {phone}</h3>

      <input
        value={otp}
        maxLength={6}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button onClick={handleVerify}>Verify OTP</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default OtpPopup;
