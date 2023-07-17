import { request } from "../../../helper/request";
export class ProducDetailtApi {
  static fetchAll = (filter) => {
    return request({
      method: "GET",
      url: `/admin/product-detail`,
      params: filter,
    });
  };

  static create = (data) => {
    return request({
      method: "POST",
      url: `/admin/product-detail`,
      data: data,
    });
  };

  static getOne = (id) => {
    return request({
      method: "GET",
      url: `/admin/product-detail/${id}`,
    });
  };

  static update = (id, data) => {
    return request({
      method: "PUT",
      url: `/admin/product-detail/${id}`,
      data: data,
    });
  };
}
