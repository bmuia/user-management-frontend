import React from 'react'
import { API_URL } from '../../config/apiConfig'
import api from '../../config/auth'


function Logout() {
    const [loading, setLoading] = React.useState(false)
    const handleLogout = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await api.post(`${API_URL}api/users/logout/`, {}, {
                withCredentials: true,
            })
            window.location.href = '/login'
        } catch (error) {
            console.error('Logout failed:', error)
            alert('Logout failed. Please try again.') 
        }finally {
            setLoading(false)
        }
    }
  return (
    <div>
        <h2>Logout</h2>
        <p>Are you sure you want to log out?</p>
        <button onClick={handleLogout}>
            {loading ? 'Logging out...' : 'Logout'}
        </button>
    </div>
  )
}

export default Logout
