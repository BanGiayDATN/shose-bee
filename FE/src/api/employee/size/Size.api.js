import { request } from "../../../helper/request";
export class SizeApi {
  static fetchAll = (filter) => {
    return request({
      method: "GET",
      url: `/admin/size`,
      params: filter,
    });
  };

  static create = (data) => {
    return request({
      method: "POST",
      url: `/admin/size`,
      data: data,
    });
  };

  static getOne = (id) => {
    return request({
      method: "GET",
      url: `/admin/size/${id}`,
    });
  };

  static update = (id, data) => {
    return request({
      method: "PUT",
      url: `/admin/size/${id}`,
      data: data,
    });
  };
}
