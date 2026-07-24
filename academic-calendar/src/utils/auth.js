import { jwtDecode } from "jwt-decode";

export const isTokenExpired = () => {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return true;
  }

  try {
    const decoded = jwtDecode(token);

    const expirationTime = decoded.exp * 1000;

    return Date.now() >= expirationTime;

  } catch (error) {
    return true;
  }
};


export const logout = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");

  window.location.href = "/login";
};