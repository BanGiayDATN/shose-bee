import { createSlice } from "@reduxjs/toolkit";

export const billSlice = createSlice({
    name: "bills",
    initialState: {
      bills: {
        value: [],
        totalPage: 0,
        currentPage: 0
      }

    },
    reducers: {
      addBill: (state, action) => {
        state.bills.value.unshift(action.payload.data);
      },
      addBills: (state, action) => {
        state.sizes.value = [...action.payload];
      },
    },
  });
  
  // Action creators are generated for each case reducer function
  export const {
    addBill,
    addBills
  } = billSlice.actions;
  
  export default billSlice.reducer;