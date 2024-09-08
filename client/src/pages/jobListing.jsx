import React, { useEffect } from "react";
import { useJobs } from "@/context/JobContext";
import { BarLoader } from "react-spinners";
import JobCard from "@/components/jobCard";
import FilterCard from "@/components/FilterCard";
const randomjobs = [1, 2, 3, 4, 5, 6, 7, 8];
const JobListing = () => {
  /* if (!loading) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }
 */
  return (
    <div className="">
      <h1 className="container gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>
      <div className="flex flex-row lg:flex-row gap-10">
        <div className="lg:w-[300px] md:w-[250px] w-full lg:h-[800px] md:h-[1250px] hidden sm:block  ">
          <FilterCard />
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 my-5 w-full">
          {randomjobs.slice(0, 6).map((item, index) => (
            <JobCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobListing;
