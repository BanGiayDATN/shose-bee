import {request } from "../../../helper/request";
export class BillClientApi {
  static createBillOnline = (data) => {
    return request({
        method: "POST",
        url: `/client/bill`,
        data:data
      });
  };


}
