import { jwtDecode } from "jwt-decode";
import { getCookie, setCookie } from "./CookiesRequest";

export const getToken = () => {
  return getCookie("userToken") || getCookie("customerToken") || "";
};

export const setToken = (token) => {
  const decodedToken = jwtDecode(token);
  const user = {
    id: decodedToken.id,
    email: decodedToken.email,
    role: decodedToken.role,
    fullName: decodedToken.fullName,
    avata: decodedToken.avata,
    expirationTime: new Date(decodedToken.exp * 1000),
  };
  const cookieName = user.role === "ROLE_ADMIN" ? "userToken" : "customerToken";
  setCookie(cookieName, token, 1);
};

export const deleteToken = () => {
  setCookie("userToken", "", 1);
};

export const setUserToken = (token) => {
  const decodedToken = jwtDecode(token);
  const user = {
    id: decodedToken.id,
    email: decodedToken.email,
    role: decodedToken.role,
    fullName: decodedToken.fullName,
    avata: decodedToken.avata,
    expirationTime: new Date(decodedToken.exp * 1000),
  };
  setCookie("user", JSON.stringify(user), 1);
};

export const getUserToken = () => {
  return getCookie("user") || "";
};

export const deleteUserToken = () => {
  setCookie("user", "", 1);
};
