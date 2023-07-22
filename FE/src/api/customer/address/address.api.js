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
      headers: {
        token: "d73043b1-2777-11ee-b394-8ac29577e80e",
      },
      url: `https://online-gateway.ghn.vn/shiip/public-api/master-data/province`,
    });
  };
  static fetchAllProvinceDistricts = (codeProvince) => {
    return requestAdress({
      method: "GET",
      headers: {
        token: "d73043b1-2777-11ee-b394-8ac29577e80e",
      },
      url: `  https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${codeProvince}`,
      params: { codeProvince },
    });
  };
  static fetchAllProvinceWard = (codeDistrict) => {
    return requestAdress({
      method: "GET",
      headers: {
        token: "d73043b1-2777-11ee-b394-8ac29577e80e",
      },
      url: ` https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${codeDistrict}`,
      params: { codeDistrict },
    });
  };

  //   static fetchAllMoneyShip = (
  //     insurance_value,
  //     coupon,
  //     to_district_id,
  //     to_ward_code
  //   ) => {
  //     return requestAdress({
  //       method: "GET",
  //       headers: {
  //         token: "d73043b1-2777-11ee-b394-8ac29577e80e",
  //         shop_id: "4374133",
  //       },
  //       url: ` https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee?service_id=${service_id}&insurance_value=${insurance_value}&coupon=${coupon}&from_district_id=${from_district_id}&to_district_id=${to_district_id}&to_ward_code=${to_ward_code}&height=${height}&length=${length}&weight=${weight}&width=${width}`,
  //       params: {
  //         service_id: 53321,
  //         insurance_value,
  //         coupon,
  //         from_district_id: 1542,
  //         to_district_id,
  //         to_ward_code,
  //         height: 15,
  //         length: 15,
  //         weight: 1000,
  //         width: 15,
  //       },
  //     });
  //   };
}
