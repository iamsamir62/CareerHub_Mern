import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get`, {
          withCredentials: true,
        });
        console.log("API Endpoint:", `${JOB_API_END_POINT}/get`);

        if (res.data.success) {
          dispatch(setAllJobs(res.data.data));
        }
      } catch (error) {
        console.log("Error fetching jobs:", error);
      }
    };

    fetchAllJobs();
  }, [dispatch]); // Including dispatch in dependency array
};

export default useGetAllJobs;
