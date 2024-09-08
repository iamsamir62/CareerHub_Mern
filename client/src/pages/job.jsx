import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { BarLoader } from "react-spinners";

const Job = () => {
  const isApplied = true;
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
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">Frontend Developer</h1>
          <div className="flex gap-2 flex-wrap">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              12 positions
            </Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">
              Part time
            </Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">
              24LPA
            </Badge>
          </div>
        </div>
        <Button
          disable={isApplied}
          className={`rounded-lg ${
            isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-[#7209b7]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium py-5">
        Job Description
      </h1>
      <div className="my-4">
        <h1>
          Role:
          <span className="pl-4 font-normal text-blue-500">
            FrontEnd Developer
          </span>
        </h1>
        <h1>
          Location:
          <span className="pl-4 font-normal text-blue-500">Butwal</span>
        </h1>
        <h1>
          Description:
          <span className="pl-4 font-normal text-blue-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
            minima, laborum nihil quia eum aliquid illum. Qui, suscipit ratione
            magnam quaerat dolor illo harum reprehenderit perferendis
            repellendus, sint, ea iusto.
          </span>
        </h1>
        <h1>
          Experience:
          <span className="pl-4 font-normal text-blue-500">2yrs</span>
        </h1>
        <h1>
          Salary:
          <span className="pl-4 font-normal text-blue-500">50LPA</span>
        </h1>
        <h1>
          Total Applicants:
          <span className="pl-4 font-normal text-blue-500">22</span>
        </h1>
        <h1>
          Posted Date:
          <span className="pl-4 font-normal text-blue-500">14-12-2024</span>
        </h1>
      </div>
    </div>
  );
};

export default Job;
