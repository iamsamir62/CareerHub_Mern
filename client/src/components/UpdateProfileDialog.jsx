import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { Loader2 } from "lucide-react";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.contact || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.map((skill) => skill) || "",
    file: user?.profile?.resume || "",
  });

  const dispatch = useDispatch();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/update-profile`,
        formData,

        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.data));
        toast.success(res.data.message);
        setOpen(false); // Close the dialog on success
      }
    } catch (error) {
      console.error(error);
      toast.error("Profile update failed. Please try again."); // Show an error message to the user
    } finally {
      setLoading(false); // Ensure loading is set to false regardless of the outcome
    }
  };

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
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right font-bold text-xl">
                  Name
                </Label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={input.fullname}
                  onChange={changeEventHandler}
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
                  value={input.email}
                  onChange={changeEventHandler}
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
                  name="phoneNumber"
                  id="phoneNumber"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
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
                  value={input.bio}
                  onChange={changeEventHandler}
                  className="col-span-3  rounded-lg outline-none py-2 px-2 text-black"
                />
              </div>
              {user?.role === "candidate" && (
                <div>
                  <div className="grid grid-cols-4 items-center gap-4 mb-4">
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
                      value={input.skills}
                      onChange={changeEventHandler}
                      className="col-span-3 rounded-lg outline-none py-2 px-2 text-black"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="file"
                      className="text-right font-bold text-xl"
                    >
                      Resume
                    </Label>
                    <input
                      type="file"
                      name="file"
                      id="file"
                      accept="application/pdf"
                      onChange={fileChangeHandler}
                      className="col-span-3 rounded-lg outline-none py-2 px-2 text-white"
                    />
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <button
                type="submit"
                className="border px-8 rounded-md shadow-lg tracking-wide bg-purple-600 text-md font-semibold py-1 border-none text-white hover:bg-purple-800"
              >
                {loading ? (
                  <div className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </div>
                ) : (
                  "UPDATE"
                )}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
