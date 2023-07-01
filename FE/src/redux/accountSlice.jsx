import { createSlice } from "@reduxjs/toolkit";

// var size = [{name:"36", status:1}, {name:"37", status:0}]
export const accountSlice = createSlice({
    name: "account",
    initialState: {
        accounts: {
        value: [] 
      }
    },
    reducers: {
      addAccount: (state, action) => {
        console.log("AddSize Action");
        state.accounts.value.unshift(action.payload);
      },
      addAllAccount: (state, action) => {
        state.accounts.value = [...action.payload];
      },
    },
  });
  
  // Action creators are generated for each case reducer function
  export const {
    addAccount,
    addAllAccount
  } = accountSlice.actions;
  
  export default accountSlice.reducer;