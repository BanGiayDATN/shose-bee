import { request } from "../../../helper/request";

export class CartClientApi {
    static addCart = (data) => {
        return request({
          method: "POST",
          url: `/cart`,
          data:data
        });
      };
    
  
   
}