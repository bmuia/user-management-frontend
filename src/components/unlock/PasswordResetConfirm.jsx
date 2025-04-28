import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'


function PasswordResetConfirm() {
    const [searchParams] = useSearchParams()
    const [status, setStatus] = React.useState("Verifying...")
    const [error, setError] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [success, setSuccess] = React.useState(false)
    const [password, setPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")
    const navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        setSuccess(false)

        const token = searchParams.get("token")

        if (!token) {
            setStatus("Invalid password reset link.")
            return
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.")
            setLoading(false)
            return
        }

        try {
            const res = await axios.post(`http://localhost:8000/api/users/password-reset-confirm/`, {
                token,
                new_password: password,
            })
            console.log(res.data)
            setStatus("🎉 Your password has been reset! You can now log in.")
            setPassword("")
            setConfirmPassword("")
            setSuccess(true)
            setTimeout(() => {
                navigate("/login")
            }, 3000)
        } catch (err) {
            console.error(err)
            setError("❌ Password reset failed. The link may be invalid or expired.")
        } finally {
            setLoading(false)
        }
    }

  return (
    <div>
        <h1>Password Reset Confirmation</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>New Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Confirm New Password:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{status}</p>}
        </form>
    </div>
  )
}

export default PasswordResetConfirm
