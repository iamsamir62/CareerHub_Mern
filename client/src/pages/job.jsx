import React, { useState, useEffect } from "react";
import { BarLoader } from "react-spinners";

const Job = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  if (isLoading) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }
  return <div>Job content</div>;
};

export default Job;
