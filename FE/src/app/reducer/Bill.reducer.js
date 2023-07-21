import { createSlice } from "@reduxjs/toolkit";

const billSlice = createSlice({
  name: "bill",
  initialState: {
    bills: {
      value: [],
    },
    search: {
      users: [],
      employees: [],
    },
    billWaitProduct: {
      value: [],
      user: null,
      vouchers: []
    },
    bill: {
      value: {},
      billDetail: [],
      billHistory: [],
      paymentsMethod: [],
      status: -1,
    },
  
  },
  reducers: {
    addProductBillWait: (state, action) => {
      var index = state.billWaitProduct.value.findIndex(
        (item) => item.status == action.payload.idProduct
      );
      if(index == -1){
        state.billWaitProduct.value.unshift(action.payload);
      }else{
        var item = state.billWaitProduct.value[index]
        item.quantity = action.payload.quantity + item.quantity
        state.billWaitProduct.value.slice(index, 1, item);
      }

    },
    addUserBillWait: (state, action) => {
      state.billWaitProduct.user = (action.payload);
    },
    addVoucherBillWait: (state, action) => {
      state.billWaitProduct.vouchers.unshift(action.payload);
    },
    addBills: (state, action) => {
      state.bills.value = [...action.payload];
    },
    getAllBill: (state, action) => {
      state.bills.value = [...action.payload];
    },
    getAllBillWait: (state, action) => {
      state.billWait.value = [...action.payload];
    },
    getUsers: (state, action) => {
      state.search.users = [...action.payload];
    },
    getEmployees: (state, action) => {
      state.search.employees = [...action.payload];
    },

    deletebillWait: (state, action) => {
      state.search.users = [];
    },
    getBill: (state, action) => {
      state.bill.value = action.payload;
    },
    getProductInBillDetail: (state, action) => {
      state.bill.billDetail = [...action.payload];
    },
    getBillHistory: (state, action) => {
      state.bill.billHistory = [...action.payload];
    },
    getPaymentsMethod: (state, action) => {
      state.bill.paymentsMethod = [...action.payload];
    },
    addPaymentsMethod: (state, action) => {
      state.bill.paymentsMethod.unshift(action.payload);
    },
    addStatusPresent: (state, action) => {
      state.bill.status = action.payload;
    },
    addBillHistory: (state, action) => {
      state.bill.billHistory.unshift(action.payload);
    },
  },
});

export const {
  getAllBill,
  getAllBillWait,
  getUsers,
  getEmployees,
  getProductInBillDetail,
  getBillHistory,
  getBill,
  addStatusPresent,
  addBillHistory,
  addProductBillWait,
  getPaymentsMethod,
  addPaymentsMethod,
  addUserBillWait,
  addVoucherBillWait
} = billSlice.actions;
export default billSlice.reducer;
export const GetBill = (state) => state.bill;
