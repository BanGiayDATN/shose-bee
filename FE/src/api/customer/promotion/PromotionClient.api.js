import { request } from "../../../helper/request";

export class PromotionClientApi {
      static getPromotionOfProductDetail = (id) => {
        return request({
          method: "GET",
          url: `/client/promotion/ofProductDetail/${id}`,
        });
      };
   
}