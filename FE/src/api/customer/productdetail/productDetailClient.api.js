import { request } from "../../../helper/request";

export class ProductDetailClientApi {
    static getByIdCategory = (id) => {
        return request({
          method: "GET",
          url: `/client/product-detail/byCategory/${id}`
        });
      };
    
      static getDetailProductOfClient = (id,codeColor,nameSize)=>{
        return request({
          method: "GET",
          url: `/client/product-detail/${id}&&${codeColor}&&${nameSize}`
        });
      };
      static getListSizeCart = (id,codeColor)=>{
        return request({
          method: "GET",
          url: `/client/product-detail/listSizeCart/${id}&&${codeColor}`
        });
      }
   
}