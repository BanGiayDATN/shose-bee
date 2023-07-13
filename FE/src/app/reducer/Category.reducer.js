import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    SetCategory: (state, action) => {
      return action.payload;
    },
    CreateCategory: (state, action) => {
      const data = action.payload;
      const newCategory = {
        stt: state.length + 1,
        id: data.id,
        name: data.name,
        status: data.status,
        createdDate: data.createdDate,
        lastModifiedDate: data.startTime,
      };
      state.unshift(newCategory);
    },
    UpdateCategory: (state, action) => {
      const updatedCategory = action.payload;
      state.map((category) => {
        if (category.id === updatedCategory.id) {
          return updatedCategory;
        }
        return category;
      });
    },
  },
});

export const { SetCategory, CreateCategory, UpdateCategory } =
  categorySlice.actions;
export default categorySlice.reducer;
export const GetCategory = (state) => state.category;
