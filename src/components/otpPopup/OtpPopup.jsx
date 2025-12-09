import React, { useEffect, useState } from "react";
import { sendOtp, verifyOtp } from "../../api/otp";
import "../otpPopup/OtpPopup.css"

const OtpPopup = ({ phone, sessionId, onSuccess, onClose }) => {
  const [otp, setOtp] = useState("");
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(59);
  const [error, setError] = useState("");

  const resendOTP = async () => {
    try {
      setError("");
      setOtp("");
      setSeconds(60); // restart timer

      const data = await sendOtp(phone); // your sendOtp() API call
      if (data?.Status === "Success") {
        setNewSessionId(data.Details); 
      } else {
        setError("Failed to resend OTP. Try again.");
      }

    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  const handleVerify = async () => {
    const ok = await verifyOtp(sessionId, otp);
    if (ok) onSuccess();
    else setError("Incorrect OTP");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, minutes]);

  return (
    <div className="otp-popup">

      <button className="close-btn" onClick={onClose}>×</button>

      <h3>Verify OTP</h3>

      <input
        type="text"
        placeholder="Enter OTP"
        maxLength={6}
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <div className="countdown-text">
        <p>
          Time Remaining:{" "}
          <span>
            {minutes < 10 ? `0${minutes}` : minutes} :
            {seconds < 10 ? `0${seconds}` : seconds}
          </span>
        </p>

        <button
          disabled={seconds > 0 || minutes > 0}
          style={{
            color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#FF5630",
          }}
          onClick={resendOTP}
          className="resend-otp-btn">
          Resend OTP
        </button>
      </div>

      <button className="submit-btn" onClick={handleVerify}>Submit</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};



export default OtpPopup;
