import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Contact, Mail, Pen } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJob from "./AppliedJob";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";
import CompaniesTable from "./admin/CompaniesTable";
import Companies from "./admin/Companies";

const isResume = true;

const profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  return (
    <>
      <div className=" items-center max-w-4xl mx-auto border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-5">
            <Avatar>
              <AvatarImage
                className="h-24 w-24"
                src={user?.profile?.profilePhoto}
              />
            </Avatar>
            <div>
              <h1 className="text-white font-medium text-xl">
                {user?.fullname}{" "}
              </h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>

          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>

        <div className="mx-5">
          <div className="  flex items-center gap-3">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="  mt-3 flex items-center gap-3">
            <Contact />
            <span>{user?.contact}</span>
          </div>
          {user?.role === "candidate" && (
            <div className="my-4 text-white">
              <h1>Skills</h1>
              <div className="flex gap-4 my-1">
                {user?.profile?.skills.length > 0 ? (
                  user.profile.skills.map((item, index) => (
                    <Badge key={index}>{item}</Badge>
                  ))
                ) : (
                  <span>NA</span>
                )}
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label className="text-md font-bold">Resume</Label>
                {user?.profile?.resume?.url ? (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={user.profile.resume.url}
                    className="text-blue-500 w-full hover:underline cursor-pointer"
                  >
                    {user.profile.resume.originalName}
                  </a>
                ) : (
                  <span>NA</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {user?.role === "candidate" ? (
        <div className="max-w-4xl mx-auto rounded-2xl">
          <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
          <AppliedJob />
        </div>
      ) : (
        <div className="max-w-4xl mx-auto rounded-2xl">
          <h1 className="font-bold text-lg my-5">Your Companies</h1>
          <Companies />
        </div>
      )}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default profile;
