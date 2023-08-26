import { request } from "../../../helper/request";

export class VoucherClientApi {
    static getByCode = (code) => {
        return request({
          method: "GET",
          url: `/client/voucher/${code}`
        });
      };
    
     
   
}