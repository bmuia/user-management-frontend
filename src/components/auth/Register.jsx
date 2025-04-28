import React from 'react'
import axios from 'axios'

function Register() {
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [confirmPassword, setConfirmPassword] = React.useState("")
    const [error, setError] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [success, setSuccess] = React.useState(false)
    const [status, setStatus] = React.useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError("")
        setSuccess(false)

        if (password !== confirmPassword) {
            setError("Passwords do not match.")
            setLoading(false)
            return
        }

        try {
            const res = await axios.post("http://localhost:8000/api/users/register/", {
                email,
                password,
                password2: confirmPassword
            })
            console.log(res.data)
            setStatus("Registration successful! Please check your email to verify your account.")
            setSuccess(true)
            setEmail("")
            setPassword("")
            setConfirmPassword("")
        } catch (err) {
            console.error(err)
            setError("Registration failed. Please check your credentials.")
        } finally {
            setLoading(false)
        }
    }
  return (
    <div>
        <h1>Register</h1>
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
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Confirm Password:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>
            <button type="submit" disabled={loading}>
                {loading ? "Registering..." : "Register"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{status}</p>}
        </form>
        <p>
            Already have an account? <a href="/login">Login here</a>
        </p>
    </div>
  )
}

export default Register
