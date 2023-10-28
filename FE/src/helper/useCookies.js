import { getCookie, setCookie } from "./CookiesRequest";

export const getToken = () => {
  return getCookie("userToken") || "";
};

export const setToken = (token) => {
  setCookie("userToken", token, 1);
};

export const deleteToken = () => {
  setCookie("userToken", "", 1);
};
