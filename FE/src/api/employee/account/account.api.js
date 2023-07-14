import { request } from "../../../helper/request";
export class AccountApi {

    static fetchDataSimpleEntityEmployees = () => {
      return request({
        method: "GET",
        url: `/account/simple-employess`
      });
    };

  //   static getOne = (id) => {
  //     return request({
  //       method: "GET",
  //       url: `/admin/category/${id}`,
  //     });
  //   };
}