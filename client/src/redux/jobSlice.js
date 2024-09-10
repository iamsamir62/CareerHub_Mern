import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: 'job',
  initialState: {
    allJobs: [],
    singlejob: null,
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload
    },
    setSingleJob: (state, action) => {
      state.singlejob = action.payload
    }
  }

});

export const { setAllJobs, setSingleJob } = jobSlice.actions;

export default jobSlice.reducer