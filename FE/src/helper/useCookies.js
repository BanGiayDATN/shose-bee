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
  const cookieName = user.role === "ROLE_USER" ? "customerToken" : "userToken";
  setCookie(cookieName, token, 1);
};

export const deleteToken = () => {
  setCookie("userToken", "", 1);
  setCookie("customerToken", "", 1);
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
  const cookieName =
    user.role === "ROLE_USER" ? "customerToken1" : "userToken1";
  setCookie(cookieName, token, 1);
};

export const getUserToken = () => {
  return getCookie("userToken1") || getCookie("customerToken1") || "";
};

export const deleteUserToken = () => {
  setCookie("userToken", "", 1);
  setCookie("customerToken", "", 1);
};
