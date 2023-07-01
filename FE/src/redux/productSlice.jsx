import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: {
      value: [] ,
      totalPage: 0,
      currentPage: 0
    },
    search:{
      isFetching:false
    }
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.value.unshift(action.payload);
    },
    addAllProduct: (state, action) => {
      state.products.value = [...action.payload.data];
      state.products.totalPage = action.payload.totalPage;
      state.products.currentPage = action.payload.currentPage;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addProduct,
  addAllProduct
} = productSlice.actions;

export default productSlice.reducer;
