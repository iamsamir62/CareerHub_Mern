import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPinIcon } from "lucide-react";
import { Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunc = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <Card className="border border-gray-200 rounded-lg shadow-md ">
      <CardHeader className="flex flex-row gap-6 ">
        <Button className="p-6 items-center" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="https://imgs.search.brave.com/2BhSv6raW7E3wOPTAUGGWArZjbqzyZvd68eVqR8ezn0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4x/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvbG9nb3MtYnJh/bmRzLWluLWNvbG9y/cy83NTAwL05ldGZs/aXhfTG9nb19SR0It/NTEyLnBuZw" />
          </Avatar>
        </Button>
        <div className="flex flex-col gap-1">
          <CardTitle className="font-bold text-lg">
            {job?.company?.name}
          </CardTitle>
          <CardTitle className="font-bold text-lg">{job?.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="text-md font-sans text-white">{job?.description}</div>
        <div className="text-lg font-sans text-white">{job?.requirements}</div>

        <div className="flex items-center gap-3">
          <MapPinIcon size={15} />
          <span>{job?.location}</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Badge className="text-blue-700 font-bold" variant="ghost">
            {job?.position} position
          </Badge>
          <Badge className="text-[#F83002] font-bold" variant="ghost">
            {job?.jobType}
          </Badge>
          <Badge className="text-[#7209b7] font-bold" variant="ghost">
            {job?.salary} LPA
          </Badge>
        </div>
        <div className="flex text-gray-400 items-center gap-3">
          <span>
            {daysAgoFunc(job?.createdAt) === 0
              ? "Today"
              : `${daysAgoFunc(job?.createdAt)} days ago`}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 items-center">
        <Link to={`/description/${job._id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            More Details
          </Button>
        </Link>
        <Heart stroke="red" fill="red" size={20} />
      </CardFooter>
    </Card>
  );
};

export default JobCard;
