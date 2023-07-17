import { request } from "../../../helper/request";
export class BillApi {
  static fetchAll = (filter) => {
    return request({
      method: "GET",
      url: `/admin/bill?startTimeString=`+ filter.startTimeString + `&endTimeString=`+ filter.endTimeString +`&status=` + filter.status + `&endDeliveryDateString=` + filter.endDeliveryDateString + `&startDeliveryDateString=` + filter.startDeliveryDateString + `&code=` + filter.code + `&employees=` + filter.employees + `&user=` + filter.user + `&phoneNumber=` + filter.phoneNumber + `&type=` + filter.type + `&page=` + filter.page ,
    });
  };

    static fetchDataUsers = () => {
      return request({
        method: "GET",
        url: `/admin/bill/user-bill`
      });
    };

    static fetchAllProductsInBillByIdBill = (id) => {
      return request({
        method: "GET",
        url: `/admin/bill-detail/`+ id
      });
    };

    static fetchDetailBill = (id) => {
      return request({
        method: "GET",
        url: `/admin/bill/detail/`+ id
      });
    };

    static fetchAllHistoryInBillByIdBill = (id) => {
      return request({
        method: "GET",
        url: `/admin/bill-history/`+ id
      });
    };

    static changeStatusBill = (id, data) => {
      return request({
        method: "PUT",
        url: `/admin/bill/change-status/`+ id,
        params: data,
      });
    };

    static changeCancelStatusBill = (id, data) => {
      return request({
        method: "PUT",
        url: `/admin/bill/cancel-status/`+ id,
        params: data,
      });
    };

    static createBillWait = () => {
      return request({
        method: "POST",
        url: `/admin/bill/offline`
      });
    };

    static getAllBillWait = () => {
      return request({
        method: "GET",
        url: `/admin/bill/details-invoices-counter`
      });
    };

  //   static getOne = (id) => {
  //     return request({
  //       method: "GET",
  //       url: `/admin/category/${id}`,
  //     });
  //   };
}
