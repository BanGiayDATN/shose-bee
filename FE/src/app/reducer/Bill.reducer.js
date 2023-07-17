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
    billWait: {
      value: [],
    },
    bill: {
      value: {},
      billDetail: [],
      billHistory: [],
      status: -1,
    },
  },
  reducers: {
    addbillWait: (state, action) => {
      var billWait = { father: action.payload, children: [] };
      state.billWait.value.unshift(billWait);
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
  addbillWait,
} = billSlice.actions;
export default billSlice.reducer;
export const GetBill = (state) => state.bill;
