import axios from "axios";
import { AppConfig, AppConfigAddress } from "../AppConfig";
import { toast } from "react-toastify";
import { store } from "../app/store";
import {
  SetLoadingFalse,
  SetLoadingTrue,
} from "../app/reducer/Loading.reducer";
// import { getToken } from "./userToken";

export const request = axios.create({
  baseURL: AppConfig.apiUrl,
});

export const requestAdress = axios.create({
  baseURL: AppConfigAddress.apiUrl,
});

request.interceptors.request.use((config) => {
  store.dispatch(SetLoadingTrue());
  const token =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2aW5obnZwaDEyQGdtYWlsLmNvbSIsImlhdCI6MTY5NzA5MDI5NSwiZXhwIjoxNjk3Njk1MDk1fQ._g2QP3swSxzJpObNNJZdHuqzyrDtT1Yh25oqrA-o8KDoh7ckcHOJJn76W_0w1saIRFFtW9_ajgiA10NA7TZydw";
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

request.interceptors.response.use(
  (response) => {
    store.dispatch(SetLoadingFalse());
    return response;
  },
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      window.location.href = "/not-authorization";
    }
    if (error.response != null && error.response.status === 400) {
      toast.error(error.response.data.message);
    }
    // if (error.response && error.response.status === 404) {
    //   window.location.href = "/not-found";
    // }
    store.dispatch(SetLoadingFalse());
    throw error;
  }
);
