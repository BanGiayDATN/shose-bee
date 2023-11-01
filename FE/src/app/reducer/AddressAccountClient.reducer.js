import { createSlice } from "@reduxjs/toolkit";

const initialState =[]
const addressAccountClientSlice = createSlice({
  name: "addressAccountClient",
  initialState,
  reducers: {
    SetAddressAccountClient: (state,action) => {
      return action.payload;
    },
    
  },
});

export const { SetAddressAccountClient } = addressAccountClientSlice.actions;
export default addressAccountClientSlice.reducer;
export const GetAddressAccountClient = (state) => state.addressAccountClient;
