import { createSlice } from "@reduxjs/toolkit";
import rootSlice, { logout } from "./rootSlice";

const jobSlice = createSlice({
  name: 'job',
  initialState: {
    allJobs: [],
    singlejob: null,
    adminjobs: [],
    searchJobByText: "",
    allAppliedJobs: [],
    searchedQuery: "",
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload
    },
    setSingleJob: (state, action) => {
      state.singlejob = action.payload
    },
    setAdminJobs: (state, action) => {
      state.adminjobs = action.payload
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.allJobs = [];
      state.singlejob = null;
      state.adminjobs = [];
      state.searchJobByText = "";

    })

  }

});

export const { setAllJobs,
  setSingleJob,
  setAdminJobs,
  setSearchJobByText,
  setAllAppliedJobs,
  setSearchedQuery } = jobSlice.actions;

export default jobSlice.reducer