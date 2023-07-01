import { createSlice } from "@reduxjs/toolkit";

// var size = [{name:"36", status:1}, {name:"37", status:0}]
export const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        notifications: {
        value: [] 
      }
    },
    reducers: {
        addNotification: (state, action) => {
        console.log("AddSize Action");
        state.notifications.value.unshift(action.payload);
      },
      addAllNotification: (state, action) => {
        state.notifications.value = [...action.payload];
      },
    },
  });
  
  // Action creators are generated for each case reducer function
  export const {
    addNotification,
    addAllNotification
  } = notificationSlice.actions;
  
  export default notificationSlice.reducer;