import React from 'react'
import axios from 'axios'
function PasswordReset() {

    const [email, setEmail] = React.useState("")
    const [error, setError] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [success, setSuccess] = React.useState(false)
    const [status, setStatus] = React.useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        setSuccess(false)

        try {
            const res = await axios.post("http://localhost:8000/api/users/reset-password/", {
                email
            })
            console.log(res.data)
            setStatus("Password reset link sent to your email.")
            setSuccess(true)
            setEmail("")
        } catch (err) {
            console.error(err)
            setError("Password reset failed. Please check your email.")
        } finally {
            setLoading(false)
        }
    }
  return (
    <div>
        <h1>Password Reset</h1>
            <form onSubmit={handleSubmit}>
                <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                </div>
                <button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Password Reset Link"}
                </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{status}</p>}
            </form>
    </div>
  )
}

export default PasswordReset
