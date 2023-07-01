import { createSlice } from "@reduxjs/toolkit";

// var size = [{name:"36", status:1}, {name:"37", status:0}]
export const soleSlice = createSlice({
    name: "sole",
    initialState: {
        soles: {
        value: [] 
      }
    },
    reducers: {
      addSole: (state, action) => {
        console.log("AddSize Action");
        state.soles.value.unshift(action.payload);
      },
      addAllSole: (state, action) => {
        state.soles.value = [...action.payload];
      },
    },
  });
  
  // Action creators are generated for each case reducer function
  export const {
    addSole,
    addAllSole
  } = soleSlice.actions;
  
  export default soleSlice.reducer;