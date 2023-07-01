import { createSlice } from "@reduxjs/toolkit";

// var size = [{name:"36", status:1}, {name:"37", status:0}]
export const employeesSlice = createSlice({
    name: "employees",
    initialState: {
        employees: {
        value: [] 
      }
    },
    reducers: {
      addEmployees: (state, action) => {
        state.employees.value.unshift(action.payload);
      },
      addAllEmployees: (state, action) => {
        state.employees.value = [...action.payload];
      },
    },
  });
  
  // Action creators are generated for each case reducer function
  export const {
    addEmployees,
    addAllEmployees
  } = employeesSlice.actions;
  
  export default employeesSlice.reducer;