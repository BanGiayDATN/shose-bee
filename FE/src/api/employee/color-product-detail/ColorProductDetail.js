import { request } from "../../../helper/request";
export class ColorProductDetailApi {
  static fetchAll = (idProductDetail) => {
    return request({
      method: "GET",
      url: `/admin/color-product-detail/${idProductDetail}`,
    });
  };
}
