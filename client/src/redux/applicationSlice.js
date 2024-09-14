import { createSlice } from "@reduxjs/toolkit";
import { logout } from "./rootSlice";
const applicationSlice = createSlice({
  name: 'application',
  initialState: {
    applicants: [],
  },
  reducers: {
    setAllApplicants: (state, action) => {
      state.applicants = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.applicants = [];
    });
  }
});

export const { setAllApplicants } = applicationSlice.actions;
export default applicationSlice.reducer