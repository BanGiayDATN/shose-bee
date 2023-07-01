import { createSlice } from "@reduxjs/toolkit";

// var size = [{name:"36", status:1}, {name:"37", status:0}]
export const userSlice = createSlice({
    name: "user",
    initialState: {
        users: {
        value: [] 
      }
    },
    reducers: {
      addUser: (state, action) => {
        console.log("AddSize Action");
        state.users.value.unshift(action.payload);
      },
      addAllUser: (state, action) => {
        state.users.value = [...action.payload];
      },
    },
  });
  
  // Action creators are generated for each case reducer function
  export const {
    addUser,
    addAllUser
  } = userSlice.actions;
  
  export default userSlice.reducer;