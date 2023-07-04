import { createSlice } from "@reduxjs/toolkit";

export const billSlice = createSlice({
    name: "bill",
    initialState: {
      bills: {
        value: [],
        totalPage: 0,
        currentPage: 0
      },
      search:{
        users: [],
        employees: []
      },
      billWait:{
        value: []
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
      addAll: (state, action) => {
        state.bills.value = [...action.payload.data];
        state.bills.totalPage = action.payload.totalPage;
        state.bills.currentPage = action.payload.currentPage;
        state.search.users = []
      },
      addAllDataUsers: (state, action) => {
        state.search.users = [...action.payload];
      },
      addAllDataEmployees: (state, action) => {
        state.search.employees = [...action.payload];
      },
      deletebillWait:(state, action) => {
        state.search.users = []
      },
    },
  });
  
  // Action creators are generated for each case reducer function
  export const {
    addBill,
    addBills,
    addAll,
    addAllDataUsers,
    deletebillWait,
    addbillWait
  } = billSlice.actions;
  
  export default billSlice.reducer;