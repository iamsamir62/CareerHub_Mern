import React, { useEffect, useState } from "react";
import { useJobs } from "@/context/JobContext";
import { BarLoader } from "react-spinners";
import JobCard from "@/components/jobCard";
import FilterCard from "@/components/FilterCard";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
const JobListing = () => {
  useGetAllJobs();
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(searchedQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <>
      <h1 className="container gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>

      <div className="flex gap-10">
        <div className="flex flex-row lg:flex-row gap-10">
          <div className="lg:w-[300px] md:w-[250px] w-full lg:h-[700px]  hidden sm:block">
            <FilterCard />
          </div>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 my-5 w-full">
          {filterJobs.length <= 0 ? (
            <span>No Jobs available</span>
          ) : (
            filterJobs.slice(0, 6).map((job) => (
              <div key={job._id} className="flex-1">
                <JobCard job={job} />
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default JobListing;
