import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("Invalid verification link.");
      return;
    }

    axios
      .get(`http://localhost:8000/api/users/verify-email/?token=${token}`)
      .then((res) => {
        setStatus("🎉 Your email has been verified! You can now log in.");
      })
      .catch((err) => {
        setStatus("❌ Verification failed. The link may be invalid or expired.");
      });
  }, [searchParams]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>{status}</h2>
    </div>
  );
}

export default VerifyEmailPage;
