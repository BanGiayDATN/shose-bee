import { request } from "../../../helper/request";
export class SizeProductDetailApi {
  static fetchAll = (idProductDetail) => {
    return request({
      method: "GET",
      url: `/admin/size-product-detail/${idProductDetail}`,
    });
  };
}
