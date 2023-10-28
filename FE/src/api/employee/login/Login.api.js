import { request } from "../../../helper/request";
export class LoginApi {
  static authenticationIn = (data) => {
    return request({
      method: "POST",
      url: `/login-v2/singin`,
      data: data,
    });
  };

  static authenticationUp = (filter) => {
    return request({
      method: "GET",
      url: `/login-v2/singup`,
      params: filter,
    });
  };

  static restPassword = (data) => {
    return request({
      method: "POST",
      url: `/login-v2/reset-password`,
      data: data,
    });
  };
}
