import React, { useEffect } from "react";
import { useJobs } from "@/context/JobContext";
import { BarLoader } from "react-spinners";
import JobCard from "@/components/jobCard";

const JobListing = () => {
  const { jobs, loading, fetchJobs, selectJob } = useJobs();

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  if (!loading) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div>
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8">
        Latest Jobs
      </h1>

      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {jobs?.length ? (
          jobs.map((job) => {
            return <JobCard key={job.id} job={job} />;
          })
        ) : (
          <div>No Jobs Found</div>
        )}
      </div>
    </div>
  );
};

export default JobListing;
