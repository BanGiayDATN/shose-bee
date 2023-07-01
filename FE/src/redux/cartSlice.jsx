import { createSlice } from "@reduxjs/toolkit";

// var size = [{name:"36", status:1}, {name:"37", status:0}]
export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        carts: {
        value: [] 
      }
    },
    reducers: {
      addCart: (state, action) => {
        console.log("AddSize Action");
        state.carts.value.unshift(action.payload);
      },
      addAllCart: (state, action) => {
        state.carts.value = [...action.payload];
      },
    },
  });
  
  // Action creators are generated for each case reducer function
  export const {
    addCart,
    addAllCart
  } = cartSlice.actions;
  
  export default cartSlice.reducer;