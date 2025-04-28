import React from 'react';
import axios from 'axios';

function DeactivateAccount() {
  const handleDeactivate = async () => {
    const confirmed = window.confirm("Are you sure you want to deactivate your account?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem('accessToken');
      await axios.post('http://localhost:8000/api/users/deactivate-account/', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Account deactivated. You will be logged out.');
      localStorage.clear();
      window.location.href = '/login';
    } catch (err) {
      console.error(err);
      alert('Something went wrong.');
    }
  };

  return (
    <div>
      <h2>Account Settings</h2>
      <button onClick={handleDeactivate} style={{ color: 'red' }}>
        Deactivate My Account
      </button>
    </div>
  );
}

export default DeactivateAccount;
