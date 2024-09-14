import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
  name: "root",
  initialState: {},
  reducers: {
    logout: () => { }
  }
});

export const { logout } = rootSlice.actions;
export default rootSlice.reducer;
