import { createSlice } from "@reduxjs/toolkit";

// var size = [{name:"36", status:1}, {name:"37", status:0}]
export const addressSlice = createSlice({
    name: "address",
    initialState: {
        address: {
        value: [] 
      }
    },
    reducers: {
      addAddress: (state, action) => {
        console.log("AddSize Action");
        state.address.value.unshift(action.payload);
      },
      addAllAddress: (state, action) => {
        state.address.value = [...action.payload];
      },
    },
  });
  
  // Action creators are generated for each case reducer function
  export const {
    addAddress,
    addAllAddress
  } = addressSlice.actions;
  
  export default addressSlice.reducer;