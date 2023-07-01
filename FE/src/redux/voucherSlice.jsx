import { createSlice } from "@reduxjs/toolkit";

export const voucherSlice = createSlice({
    name: "voucher",
    initialState: {
        vouchers: {
        value: [] 
      }
    },
    reducers: {
      addVoucher: (state, action) => {
        console.log("AddSize Action");
        state.vouchers.value.unshift(action.payload);
      },
      addAllVoucher: (state, action) => {
        state.vouchers.value = [...action.payload];
      },
    },
  });
  
  // Action creators are generated for each case reducer function
  export const {
    addVoucher,
    addAllVoucher
  } = voucherSlice.actions;
  
  export default voucherSlice.reducer;