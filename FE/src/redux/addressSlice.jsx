import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const host = "https://provinces.open-api.vn/api/";

var callAPI = (api) => {
     axios.get(api)
        .then((response) => {
          return response.data;
        });
        return [];
}
var callApiDistrict = (api) => {
     axios.get(api)
        .then((response) => {
          return response.data.districts;
        });
        return [];
}
var callApiWard = (api) => {
     axios.get(api)
        .then((response) => {
             return response.data.wards;
        });
        return [];
}
export const addressSlice = createSlice({
    name: "address",
    initialState: {
        address: {
        value: [] 
      },
      city: callAPI,
      district: callApiDistrict,
      ward: callApiWard,

    },
    reducers: {
      addAddress: (state, action) => {
        state.address.value.unshift(action.payload);
      },
      addAllAddress: (state, action) => {
        state.address.value = [...action.payload];
      },
    },
  });
  
  // Action creators are generated for each case reducer function
  export const {
    addAddress,
    addAllAddress
  } = addressSlice.actions;
  
  export default addressSlice.reducer;