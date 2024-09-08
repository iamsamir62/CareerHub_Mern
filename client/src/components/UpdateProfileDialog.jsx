import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";

const UpdateProfileDialog = ({ open, setOpen }) => {
  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right font-bold text-xl">
                  Name
                </Label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="col-span-3 rounded-lg outline-none py-2 px-2 text-black"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right font-bold text-xl">
                  Email
                </Label>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="col-span-3 rounded-lg outline-none py-2 px-2 text-black"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="number"
                  className="text-right font-bold text-xl"
                >
                  Number
                </Label>
                <input
                  type="text"
                  name="number"
                  id="number"
                  className="col-span-3 rounded-lg outline-none py-2 px-2 text-black"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right font-bold text-xl">
                  Bio
                </Label>
                <input
                  type="text"
                  name="bio"
                  id="bio"
                  className="col-span-3  rounded-lg outline-none py-2 px-2 text-black"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="skills"
                  className="text-right font-bold text-xl"
                >
                  Skills
                </Label>
                <input
                  type="text"
                  name="skills"
                  id="skills"
                  className="col-span-3  rounded-lg outline-none py-2 px-2 text-black"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right font-bold text-xl">
                  Resume
                </Label>
                <input
                  type="file"
                  name="file"
                  id="file"
                  accept="application/pdf"
                  className="col-span-3  rounded-lg outline-none py-2 px-2 text-white"
                />
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
