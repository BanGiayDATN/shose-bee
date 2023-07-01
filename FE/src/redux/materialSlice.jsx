import { createSlice } from "@reduxjs/toolkit";

// var size = [{name:"36", status:1}, {name:"37", status:0}]
export const materialSlice = createSlice({
    name: "material",
    initialState: {
        materials: {
        value: [] 
      }
    },
    reducers: {
      addMaterial: (state, action) => {
        console.log("AddSize Action");
        state.materials.value.unshift(action.payload);
      },
      addAllMaterial: (state, action) => {
        state.materials.value = [...action.payload];
      },
    },
  });
  
  // Action creators are generated for each case reducer function
  export const {
    addSize,
    addAllPost
  } = materialSlice.actions;
  
  export default materialSlice.reducer;