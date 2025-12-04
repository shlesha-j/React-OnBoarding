const API_KEY = "26682dee-d034-11f0-a6b2-0200cd936042";

export const sendOtp = async (phone) => {
    const response = await fetch(
        `https://2factor.in/API/V1/${API_KEY}/SMS/${phone}/AUTOGEN/OTP1`
    );

    const data = await response.json();

    return {
        success: data.Status === "Success",
        sessionId: data.Details
    };
};

export const verifyOtp = async (sessionId, otp) => {
    const response = await fetch(
        `https://2factor.in/API/V1/${API_KEY}/SMS/VERIFY/${sessionId}/${otp}`
    );

    const data = await response.json();
    return data.Status === "Success";
};
