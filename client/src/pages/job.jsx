import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { setSingleJob } from "@/redux/jobSlice";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";
import { toast } from "sonner";

const Job = () => {
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const { singlejob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);

  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          // Update `isApplied` based on fetched job data
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false); // Set loading to false after fetching
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const updatedSingleJob = {
          ...singlejob,
          applications: [...singlejob.applications, { applicant: user?._id }],
        };

        dispatch(setSingleJob(updatedSingleJob));
        setIsApplied(true); // Update `isApplied` to true
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  if (isLoading) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-gray-200 text-xl">
            {singlejob?.title}
          </h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className={"text-blue-700 font-bold"} variant="ghost">
              {singlejob?.position} Positions
            </Badge>
            <Badge className={"text-[#F83002] font-bold"} variant="ghost">
              {singlejob?.jobType}
            </Badge>
            <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
              {singlejob?.salary} LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isApplied ? null : applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
        Job Description
      </h1>
      <div className="my-4">
        <h1 className="font-bold my-1">
          Role:{" "}
          <span className="pl-4 font-normal text-gray-200">
            {singlejob?.title}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Key skills:{" "}
          <span className="pl-4 font-normal text-gray-200">
            <ul>
              {singlejob?.requirements?.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Location:{" "}
          <span className="pl-4 font-normal text-gray-200">
            {singlejob?.location}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Description:{" "}
          <span className="pl-4 font-normal text-gray-200">
            {singlejob?.description}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Experience:{" "}
          <span className="pl-4 font-normal text-gray-200">
            {singlejob?.experienceLevel} yrs
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Salary:{" "}
          <span className="pl-4 font-normal text-gray-200">
            {singlejob?.salary} LPA
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Total Applicants:{" "}
          <span className="pl-4 font-normal text-gray-200">
            {singlejob?.applications?.length}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Posted Date:{" "}
          <span className="pl-4 font-normal text-gray-200">
            {singlejob?.createdAt.split("T")[0]}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default Job;
