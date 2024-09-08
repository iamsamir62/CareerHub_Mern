import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Contact, Mail, Pen } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJob from "./AppliedJob";
import UpdateProfileDialog from "./UpdateProfileDialog";

const skills = ["React", "Python", "Nextjs", "Nodejs"];
const isHaveResume = true;

const profile = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className=" items-center max-w-4xl mx-auto border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-5">
            <Avatar>
              <AvatarImage
                className="h-24 w-24"
                src="https://imgs.search.brave.com/2BhSv6raW7E3wOPTAUGGWArZjbqzyZvd68eVqR8ezn0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4x/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvbG9nb3MtYnJh/bmRzLWluLWNvbG9y/cy83NTAwL05ldGZs/aXhfTG9nb19SR0It/NTEyLnBuZw"
              />
            </Avatar>
            <div>
              <h1 className="text-white font-medium text-xl">Full Name</h1>
              <p>Add your bio here!</p>
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
            <span>kcsamir1961@gmail.com</span>
          </div>
          <div className="  mt-3 flex items-center gap-3">
            <Contact />
            <span>9861683637</span>
          </div>
          <div className=" my-3  text-white">
            <h1>Skills</h1>
            <div className="flex gap-4 my-1">
              {skills.length > 0 ? (
                skills.map((item, index) => <Badge key={index}>{item}</Badge>)
              ) : (
                <span>Na</span>
              )}
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label className="text-md font-bold">Resume</Label>
            {isHaveResume ? (
              <a
                target="blank"
                href="https://youtube.com/@patemmernstack"
                className="text-blue-500 w-full hover:underline cursor-pointer"
              >
                Link
              </a>
            ) : (
              <span>NA</span>
            )}
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto rounded-2xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        <AppliedJob />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default profile;
