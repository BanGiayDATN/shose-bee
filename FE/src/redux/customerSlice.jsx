import { createSlice } from "@reduxjs/toolkit";

// var size = [{name:"36", status:1}, {name:"37", status:0}]
export const customerSlice = createSlice({
    name: "customer",
    initialState: {
        customers: {
        value: [] 
      }
    },
    reducers: {
      addCustomer: (state, action) => {
        console.log("AddSize Action");
        state.customers.value.unshift(action.payload);
      },
      addAllCustomer: (state, action) => {
        state.customers.value = [...action.payload];
      },
    },
  });
  
  // Action creators are generated for each case reducer function
  export const {
    addCustomer,
    addAllCustomer
  } = customerSlice.actions;
  
  export default customerSlice.reducer;