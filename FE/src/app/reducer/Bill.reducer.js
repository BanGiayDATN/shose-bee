import { createSlice } from "@reduxjs/toolkit";

const billSlice = createSlice({
  name: "material",
  initialState: {
    bills: {
      value: []
    },
    search:{
      users: [],
      employees: []
    },
    billWait:{
      value: []
    },
    bill: {
      value: {},
      billDetail: [],
      billHistory: [],
      status: -1,
    }

  },
  reducers: {
    addbillWait: (state, action) => {
      state.bills.value.unshift(action.payload);
      state.billWait.value.unshift(action.payload);
    },
    addBills: (state, action) => {
      state.bills.value = [...action.payload];
    },
    getAllBill: (state, action) => {
      state.bills.value = [...action.payload];
    },
    getUsers: (state, action) => {
      state.search.users = [...action.payload];
    },
    getEmployees: (state, action) => {
      state.search.employees = [...action.payload];
    },
    
    deletebillWait:(state, action) => {
      state.search.users = []
    },
    getBill:(state, action) => {
      state.bill.value = action.payload
    },
    getProductInBillDetail: (state, action) => {
      state.bill.billDetail = [...action.payload]
    },
    getBillHistory: (state, action) => {
      state.bill.billHistory = [...action.payload]
    },
    addStatusPresent:  (state, action) => {
      state.bill.status = action.payload
    },
  },
});

export const { getAllBill, getUsers, getEmployees, getProductInBillDetail, getBillHistory, getBill, addStatusPresent } =
billSlice.actions;
export default billSlice.reducer;
export const GetMaterail = (state) => state.bill;
