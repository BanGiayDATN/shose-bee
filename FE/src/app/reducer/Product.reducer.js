import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    SetProduct: (state, action) => {
      return action.payload;
    },
    CreateProduct: (state, action) => {
      const data = action.payload;
      const newProduct = {
        stt: 1,
        id: data.id,
        gender: data.gender,
        price: data.price,
        image: data.image,
        nameProduct: data.nameProduct,
        status: data.status,
        createdDate: data.createdDate,
      };
      state.unshift(newProduct);
      state.forEach((item, index) => {
        item.stt = index + 1;
      });
    },
    UpdateProduct: (state, action) => {
      const update = action.payload; // backend
      const index = state.findIndex((period) => period.id === update.id);
      console.log(index);
      if (index !== -1) {
        state[index].nameProduct = update.nameProduct;
        state[index].gender = update.gender;
        state[index].price = update.price;
        state[index].image = update.image;
        state[index].status = update.status;
        state[index].createdDate = update.createdDate;
      }
    },
  },
});

export const { SetProduct, CreateProduct, UpdateProduct } =
  productSlice.actions;
export default productSlice.reducer;
export const GetProduct = (state) => state.product;
