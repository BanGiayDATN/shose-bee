import { createSlice } from "@reduxjs/toolkit";

// var size = [{name:"36", status:1}, {name:"37", status:0}]
export const categorySlice = createSlice({
    name: "category",
    initialState: {
        categorys: {
        value: [] 
      }
    },
    reducers: {
      addCategory: (state, action) => {
        console.log("AddSize Action");
        state.categorys.value.unshift(action.payload);
      },
      addAllCategory: (state, action) => {
        state.categorys.value = [...action.payload];
      },
    },
  });
  
  // Action creators are generated for each case reducer function
  export const {
    addCategory,
    addAllCategory
  } = categorySlice.actions;
  
  export default categorySlice.reducer;