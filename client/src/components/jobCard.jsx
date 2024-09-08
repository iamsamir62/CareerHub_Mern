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

const JobCard = () => {
  const navigate = useNavigate();
  const jobId = "jtduyurrfghjjg";
  return (
    <Card className="border border-gray-200 rounded-lg shadow-md p-4">
      <CardHeader className="flex flex-row gap-6 mb-4">
        <Button className="p-6 items-center" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src="https://imgs.search.brave.com/2BhSv6raW7E3wOPTAUGGWArZjbqzyZvd68eVqR8ezn0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4x/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvbG9nb3MtYnJh/bmRzLWluLWNvbG9y/cy83NTAwL05ldGZs/aXhfTG9nb19SR0It/NTEyLnBuZw" />
          </Avatar>
        </Button>
        <div className="flex flex-col gap-1">
          <CardTitle className="font-bold text-lg">Company Name</CardTitle>
          <CardTitle className="font-bold text-lg">Job Title</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="text-lg font-sans text-white">
          skills:[react,html,node]
        </div>
        <div className="flex items-center gap-3">
          <MapPinIcon size={15} />
          <span>BUTWAL</span>
        </div>
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
      </CardContent>
      <CardFooter className="flex gap-2 items-center">
        <Link to={`/description/${jobId}`} className="flex-1">
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
