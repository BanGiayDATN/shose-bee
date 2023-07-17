import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
  name: "address",
  initialState: {
    city: [],
    district: [],
    ward: [],
  },
  reducers: {
    getCity: (state, action) => {
      state.city = [...action.payload];
    },
    getDistrict: (state, action) => {
      state.district = [...action.payload];
    },
    getWard: (state, action) => {
      state.ward = [...action.payload];
    },
  },
});

export const { getCity, getDistrict, getWard } = addressSlice.actions;
export default addressSlice.reducer;
export const GetAddress = (state) => state.address;
