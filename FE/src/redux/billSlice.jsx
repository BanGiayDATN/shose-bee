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
      }

    },
    reducers: {
      addBill: (state, action) => {
        state.bills.value.unshift(action.payload.data);
      },
      addBills: (state, action) => {
        state.bills.value = [...action.payload];
      },
      addAll: (state, action) => {
        state.bills.value = [...action.payload.data];
        state.bills.totalPage = action.payload.totalPage;
        state.bills.currentPage = action.payload.currentPage;
      },
      addAllDataUsers: (state, action) => {
        state.search.users = [...action.payload];
      },
      addAllDataEmployees: (state, action) => {
        state.search.employees = [...action.payload];
      },
    },
  });
  
  // Action creators are generated for each case reducer function
  export const {
    addBill,
    addBills,
    addAll,
    addAllDataUsers
  } = billSlice.actions;
  
  export default billSlice.reducer;