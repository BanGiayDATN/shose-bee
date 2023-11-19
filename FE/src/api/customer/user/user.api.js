import { request } from "../../../helper/request";
export class UserPoinApi {
  static findUser = () => {
    return request({
      method: "GET",
      url: `/client/user`,
    });
  };

 
}
