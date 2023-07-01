import { createSlice } from "@reduxjs/toolkit";

// var size = [{name:"36", status:1}, {name:"37", status:0}]
export const colorSlice = createSlice({
    name: "color",
    initialState: {
        colors: {
        value: [] 
      }
    },
    reducers: {
      addColor: (state, action) => {
        console.log("AddSize Action");
        state.colors.value.unshift(action.payload);
      },
      addAllColor: (state, action) => {
        state.colors.value = [...action.payload];
      },
    },
  });
  
  // Action creators are generated for each case reducer function
  export const {
    addColor,
    addAllColor
  } = colorSlice.actions;
  
  export default colorSlice.reducer;