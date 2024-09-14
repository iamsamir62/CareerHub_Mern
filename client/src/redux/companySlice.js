import { createSlice } from "@reduxjs/toolkit";
import { logout } from "./rootSlice";

const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: null,
    companies: [],
    searchCompanyByText: ""
  },
  reducers: {
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload
    },
    setCompanies: (state, action) => {
      state.companies = action.payload
    },
    setSearchCompanyByText: (state, action) => {
      state.searchCompanyByText = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      state.singleCompany = null;
      state.companies = [];
      state.searchCompanyByText = "";
    })

  }
})

export const { setSingleCompany, setCompanies, setSearchCompanyByText } = companySlice.actions;
export default companySlice.reducer;