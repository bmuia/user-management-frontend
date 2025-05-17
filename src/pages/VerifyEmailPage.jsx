import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/apiConfig";

function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const [statusMessage, setStatusMessage] = useState("Verifying your email...");
  const [statusType, setStatusType] = useState("info"); // success | error | info
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");

      if (!token) {
        setStatusMessage("❌ Invalid verification link.");
        setStatusType("error");
        return;
      }

      try {
        const res = await axios.post(`${API_URL}accounts/verify-email/`, { token });

        const message = res.data?.message || "🎉 Your email has been verified!";
        setStatusMessage(message);
        setStatusType("success");

        if (res.status === 201 || res.status === 200) {
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        }

      } catch (err) {
        const message =
          err?.response?.data?.error ||
          err?.response?.data?.message ||
          "❌ Verification failed. The link may be invalid or expired.";

        setStatusMessage(message);
        setStatusType("error");
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  const statusColor = {
    success: "text-green-600",
    error: "text-red-600",
    info: "text-gray-600",
  }[statusType];

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm p-6 border border-gray-200 rounded-lg shadow-sm">
        <h1 className="text-xl font-semibold text-center mb-4">Email Verification</h1>
        <p className={`text-center text-base ${statusColor}`}>{statusMessage}</p>
        {statusType === "success" && (
          <p className="mt-3 text-center text-sm text-gray-500">
            Redirecting to login...
          </p>
        )}
      </div>
    </div>
  );
}

export default VerifyEmailPage;
