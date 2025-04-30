import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Get the token from localStorage
    const accessToken = localStorage.getItem('access');
    if (accessToken) {
      setUser({ token: accessToken });
    }
  }, []);

  const login = (accessToken) => {
    // Save only the access token string
    localStorage.setItem('access', accessToken);
    setUser({ token: accessToken });
  };

  const logout = () => {
    localStorage.removeItem('access');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
