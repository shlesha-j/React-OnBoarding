import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { sendOtp } from "../api/otp";

const LoginForm = ({ onOtpSent }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const { phone } = data;
    const res = await sendOtp(phone);
    if (res.success) {
      onOtpSent(res.sessionId, phone);
    }
    console.log("Final Form Data:", data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="LoginForm">
      <div className="form-grp">
        <label>UserName :</label>
        <input
          {...register("username", { required: "UserName is required" })}
        />
        {errors.username && (
          <p className="error">{errors.username.message}</p>
        )}
      </div>

      <div className="form-grp">
        <label>Phone Number :</label>
        <input
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
              message: "Invalid mobile number",
            },
          })}
        />
        {errors.phone && <p className="error">{errors.phone.message}</p>}
      </div>
      
      
      <button type="submit">Send OTP</button>
    </form>
  );
};

export default LoginForm;
