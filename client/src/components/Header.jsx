import React, { useDebugValue, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { LogOut, PenBox, SearchIcon, User2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import Profile from "../components/profile";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { logout } from "@/redux/rootSlice";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(logout());
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <nav className="py-4 px-4 sm:px-6 md:px-8 flex flex-col md:flex-row justify-between items-center">
      <Link to="/" className="flex items-center mb-4 md:mb-0">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">
          Career<span className="text-red-700 font-mono">Hub</span>
        </h1>
      </Link>

      <div className="flex items-center ">
        {user ? (
          <div className="flex items-center space-x-4">
            {user?.role === "recruiter" && (
              <Button
                variant="destructive"
                className="rounded-full hidden md:block"
              >
                <Link to={"/admin"}> Companies</Link>
              </Button>
            )}
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto}
                    alt="Profile Image"
                  />

                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="Profile Image"
                    />

                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-lg">{user?.fullname} </h4>
                    <p className="text-sm text-white text-muted-foreground">
                      {user?.profile?.bio || "No bio available"}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="blue" className="text-md w-full">
                    <User2 className="mr-2" />
                    <Link to="/profile">View Profile</Link>
                  </Button>
                  <Button
                    onClick={logoutHandler}
                    variant="destructive"
                    className="text-md w-full"
                  >
                    <LogOut className="mr-2" />
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Link to="/auth">
            <Button variant="blue" className="text-xl">
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;
