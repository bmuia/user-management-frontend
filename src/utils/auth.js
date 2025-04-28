import { jwtDecode } from 'jwt-decode'

export const getUserIdFromToken = () => {
  const token = localStorage.getItem("access"); // or wherever you're storing the token

  if (!token) {
    return null; // or handle the case where there's no token
  }

  try {
    const decoded = jwtDecode(token);
    return decoded.user_id; // assuming your JWT contains the user_id as a claim
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
};
