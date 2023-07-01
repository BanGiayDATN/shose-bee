import { createSlice } from "@reduxjs/toolkit";

// var size = [{name:"36", status:1}, {name:"37", status:0}]
export const brandSlice = createSlice({
    name: "brand",
    initialState: {
        brands: {
        value: [] 
      }
    },
    reducers: {
      addBrand: (state, action) => {
        console.log("AddSize Action");
        state.brands.value.unshift(action.payload);
      },
      addAllBrand: (state, action) => {
        state.brands.value = [...action.payload];
      },
    },
  });
  
  // Action creators are generated for each case reducer function
  export const {
    addBrand,
    addAllBrand
  } = brandSlice.actions;
  
  export default brandSlice.reducer;