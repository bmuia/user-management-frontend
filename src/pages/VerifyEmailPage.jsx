import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { API_URL } from "../config/apiConfig";

function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("Verifying your email...");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");

      if (!token) {
        const errorMsg = "❌ Invalid verification link.";
        setStatus(errorMsg);
        toast.error(errorMsg);
        return;
      }

      try {
        const res = await axios.get(`${API_URL}api/users/verify-email/?token=${token}`);
        const successMsg = "🎉 Your email has been verified! Redirecting to login...";
        setStatus(successMsg);
        toast.success("Email verified successfully!");

        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (err) {
        const errorMsg = "❌ Verification failed. The link may be invalid or expired.";
        setStatus(errorMsg);
        toast.error("Verification failed!");
      }
    };

    verifyEmail(); // Call the async function
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold mb-4">Email Verification</h2>
        <p className="text-gray-700">{status}</p>
      </div>
    </div>
  );
}

export default VerifyEmailPage;
