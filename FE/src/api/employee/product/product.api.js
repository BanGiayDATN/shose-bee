import { request } from "../../../helper/request";
export class ProductApi {
  static fetchAll = (filter) => {
    return request({
      method: "GET",
      url: `/admin/product`,
      params: filter,
    });
  };

  static create = (data) => {
    return request({
      method: "POST",
      url: `/admin/product`,
      data: data,
    });
  };

  static getOne = (id) => {
    return request({
      method: "GET",
      url: `/admin/product/${id}`,
    });
  };
  static getProductUse = () => {
    return request({
      method: "GET",
      url: `/admin/product/use`,
    });
  };
  

  static update = (id, data) => {
    return request({
      method: "PUT",
      url: `/admin/product/${id}`,
      data: data,
    });
  };
}
