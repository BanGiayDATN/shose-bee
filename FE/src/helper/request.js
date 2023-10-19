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
    "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQURNSU4iLCJmdWxsTmFtZSI6Ik5ndXnhu4VuIFbEg24gVmluaCIsImlkIjoiNDcxZTg3NzEtZTU4Yi00YTFiLWE0NzktNGUzOGZlNDk5ZWQyIiwiZW1haWwiOiJ2aW5obnZwaDEyQGdtYWlsLmNvbSIsImlhdCI6MTY5NzU0MDg2OSwiZXhwIjoxNjk4MTQ1NjY5fQ.8kkVzoBUsCFdL7h6hWL2L10umU07TKf6VMKdmr07Mdg";
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
