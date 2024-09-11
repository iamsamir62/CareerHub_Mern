import { setAdminJobs, setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/adminjobs`, {
          withCredentials: true,
        });
        console.log("API Endpoint:", `${JOB_API_END_POINT}/adminjobs`);

        if (res.data.success) {
          console.log(res.data.jobs);

          dispatch(setAdminJobs(res.data.jobs));
        }
      } catch (error) {
        console.log("Error fetching jobs:", error);
      }
    };

    fetchAllAdminJobs();
  }, [dispatch]); // Including dispatch in dependency array
};

export default useGetAllAdminJobs;
