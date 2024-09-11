import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: 'job',
  initialState: {
    allJobs: [],
    singlejob: null,
    adminjobs: [],
    searchJobByText: "",
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
  }

});

export const { setAllJobs, setSingleJob, setAdminJobs, setSearchJobByText } = jobSlice.actions;

export default jobSlice.reducer