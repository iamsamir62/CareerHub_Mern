import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./ui/badge";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const AppliedJob = () => {
  useGetAppliedJobs();

  const { allAppliedJobs } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right ">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.map((appliedJob) => (
            <TableRow key={appliedJob?._id}>
              <TableCell>{appliedJob.createdAt.split("T")[0]}</TableCell>
              <TableCell>{appliedJob.job?.title}</TableCell>
              <TableCell>{appliedJob.job?.company.name}</TableCell>
              <TableCell className="text-right">
                <Badge
                  className={`${
                    appliedJob?.status === "rejected"
                      ? "bg-red-400"
                      : appliedJob.status === "pending"
                      ? "bg-gray-400"
                      : "bg-green-400"
                  }`}
                >
                  {appliedJob.status.toUpperCase()}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJob;
