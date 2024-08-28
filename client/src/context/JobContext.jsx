import React, { createContext, useContext, useState } from "react";

const JobContext = createContext();

const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to fetch jobs
  const fetchJobs = async () => {
    setLoading(true);
    try {
      // Simulate an API call to fetch jobs
      const jobData = await new Promise((resolve) =>
        setTimeout(
          () =>
            resolve([
              {
                id: 1,
                title: "Software Engineer",
                company: "Tech Corp",
                location: "New York",
              },
              {
                id: 2,
                title: "Product Manager",
                company: "Business Inc",
                location: "San Francisco",
              },
            ]),
          1000
        )
      );
      setJobs(jobData);
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to select a job
  const selectJob = (jobId) => {
    const job = jobs.find((job) => job.id === jobId);

    setSelectedJob(job);
  };

  return (
    <JobContext.Provider
      value={{ jobs, selectedJob, loading, fetchJobs, selectJob }}
    >
      {children}
    </JobContext.Provider>
  );
};

const useJobs = () => {
  const context = useContext(JobContext);

  if (!context) {
    throw new Error("useJobs must be used within a JobProvider");
  }

  return context;
};

export { JobProvider, useJobs };
