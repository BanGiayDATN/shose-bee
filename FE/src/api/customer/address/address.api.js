import { request, requestAdress } from "../../../helper/request";
export class AddressApi {
  static fetchAll = (filter) => {
    return request({
      method: "GET",
      url: `/customer/address?id_user=7d27cbd0-6569-48f8-8286-378b956dab26`,
      params: filter,
    });
  };

  static create = (data) => {
    return request({
      method: "POST",
      url: `/customer/address`,
      data: data,
    });
  };

  static getOne = (id) => {
    return request({
      method: "GET",
      url: `/customer/address/${id}`,
    });
  };

  static update = (id, data) => {
    return request({
      method: "PUT",
      url: `/customer/address/${id}`,
      data: data,
    });
  };
  static fetchAllProvince = () => {
    return requestAdress({
      method: "GET",
      url: `https://provinces.open-api.vn/api/`,
    });
  };
  static fetchAllProvinceDistricts = (codeProvince) => {
    return requestAdress({
      method: "GET",
      url: `https://provinces.open-api.vn/api/p/${codeProvince}?depth=2`,
      params: { codeProvince },
    });
  };
  static fetchAllProvinceWard = (codeDistrict) => {
    return requestAdress({
      method: "GET",
      url: `https://provinces.open-api.vn/api/d/${codeDistrict}?depth=2`,
      params: { codeDistrict },
    });
  };
}
