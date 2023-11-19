import { request } from "../../../helper/request";
export class AccountPoinApi {
  static findPoin = () => {
    return request({
      method: "GET",
      url: `/admin/poin`,
    });
  };

 
}
