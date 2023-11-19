import { request } from "../../../helper/request";
export class BillApi {
  static fetchAll = (filter) => {
    return request({
      method: "GET",
      url:
        `/admin/bill?startTimeString=` +
        filter.startTimeString +
        `&endTimeString=` +
        filter.endTimeString +
        `&status=` +
        filter.status +
        `&endDeliveryDateString=` +
        filter.endDeliveryDateString +
        `&startDeliveryDateString=` +
        filter.startDeliveryDateString +
        `&key=` +
        filter.key +
        `&employees=` +
        filter.employees +
        `&user=` +
        filter.user +
        `&phoneNumber=` +
        filter.phoneNumber +
        `&type=` +
        filter.type +
        `&page=` +
        filter.page,
    });
  };

  static fetchAllBillAtCounter = () => {
    return request({
      method: "GET",
      url: `/admin/bill/details-invoices-counter`,
    });
  };

  static fetchCountPayMentPostpaidByIdBill = (id) => {
    return request({
      method: "GET",
      url: `/admin/bill/count-paymet-post-paid/${id}`,
    });
  };

  static fetchDataUsers = () => {
    return request({
      method: "GET",
      url: `/admin/bill/user-bill`,
    });
  };

  static fetchAllProductsInBillByIdBill = (id) => {
    return request({
      method: "GET",
      url: `/admin/bill-detail/` + id,
    });
  };

  static fetchDetailBill = (id) => {
    return request({
      method: "GET",
      url: `/admin/bill/detail/` + id,
    });
  };

  static fetchAllHistoryInBillByIdBill = (id) => {
    return request({
      method: "GET",
      url: `/admin/bill-history/` + id,
    });
  };

  static changeStatusBill = (id, data) => {
    return request({
      method: "PUT",
      url: `/admin/bill/change-status/` + id,
      params: data,
    });
  };

  static updateBill = (id, data) => {
    return request({
      method: "PUT",
      url: `/admin/bill/update-offline/` + id,
      data: data,
    });
  };

  static updateBillWait = (data) => {
    return request({
      method: "PUT",
      url: `/admin/bill/update-bill-wait`,
      data: data,
    });
  };

  static changeCancelStatusBill = (id, data) => {
    return request({
      method: "PUT",
      url: `/admin/bill/cancel-status/` + id,
      params: data,
    });
  };

  static createBillWait = (data) => {
    return request({
      method: "POST",
      url: `/admin/bill`,
      data: data,
    });
  };

  static getAllBillWait = () => {
    return request({
      method: "GET",
      url: `/admin/bill/details-invoices-counter`,
    });
  };

  static getDetaiProductInBill = (id) => {
    return request({
      method: "GET",
      url: `/admin/bill-detail/detail/` + id,
    });
  };

  static addProductInBill = (data) => {
    return request({
      method: "POST",
      url: `/admin/bill-detail/add-product`,
      data: data,
    });
  };

  static removeProductInBill = (id, size) => {
    return request({
      method: "DELETE",
      url: `/admin/bill-detail/remove/${id}/${size}`,
    });
  };

  static updateProductInBill = (id, data) => {
    return request({
      method: "PUT",
      url: `/admin/bill-detail/${id}`,
      data: data,
    });
  };
  static refundProduct = (data) => {
    return request({
      method: "PUT",
      url: `/admin/bill-detail/refund`,
      data: data,
    });
  };

  static changeStatusAllBillByIds = (data) => {
    return request({
      method: "PUT",
      url: `/admin/bill/change-status-bill`,
      data: data,
    });
  };
  static getCodeBill = () => {
    return request({
      method: "GET",
      url: `/admin/bill/code-bill`,
    });
  };

  static exportPdf = (id) => {
    return request({
      method: "GET",
      url: `/admin/bill/invoice/${id}`,
    });
  };

  static ChangeAllEmployeeInBill = (data) => {
    return request({
      method: "PUT",
      url: `/admin/bill/change-all-employee`,
      data: data,
    });
  };

  static ChangeEmployeeInBill = (data) => {
    return request({
      method: "PUT",
      url: `/admin/bill/change-employee`,
      data: data,
    });
  };

  static BillGiveBackInformation = (codeBill) => {
    return request({
      method: "GET",
      url: `/admin/bill/give-back-information?codeBill=${codeBill}`,
    });
  };

  static BillGiveBack = (idBill) => {
    return request({
      method: "GET",
      url: `/admin/bill/give-back?idBill=${idBill}`,
    });
  };

  static UpdateBillGiveBack = (data) => {
    return request({
      method: "POST",
      url: `/admin/bill/give-back`,
      data: data,
    });
  };
}
