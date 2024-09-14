import { createSlice } from "@reduxjs/toolkit";
import { logout } from "./rootSlice";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null
  },
  reducers: {
    // actions
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.loading = false;
      state.user = null;
    })

  }
});
export const { setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;