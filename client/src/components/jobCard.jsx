import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Heart, MapPinIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const JobCard = ({ job, selectJob }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          {job.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
          <div>{job.company}</div>
          <div className="flex gap-3 items-center">
            <MapPinIcon size={15} />
            {job.location}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link to={`/job/${job.id}`} className="flex-1">
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
