import { request } from "../../../helper/request";
export class PaymentsMethodApi {
  static findByIdBill = (id) => {
    return request({
      method: "GET",
      url: `/admin/payment/bill/` +id,
    });
  };

  static payment = (id, data) => {
    return request({
      method: "POST",
      url: `/admin/payment/bill/` +id,
      data: data
    });
  };

  static updateStatus = ( data) => {
    return request({
      method: "PUT",
      url: `/admin/payment/update-status`,
      data: data
    });
  };
}
