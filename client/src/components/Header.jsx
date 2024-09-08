import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { LogOut, PenBox, SearchIcon, User2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import Profile from "../components/profile";

const Header = () => {
  const { user } = useSelector((store) => store.auth);
  return (
    <nav className="py-4 px-4 sm:px-6 md:px-8 flex flex-col md:flex-row justify-between items-center">
      <Link to="/" className="flex items-center mb-4 md:mb-0">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">
          Career<span className="text-red-700 font-mono">Hub</span>
        </h1>
      </Link>
      <div className="relative w-full md:w-80 mb-4 md:mb-0">
        <input
          type="text"
          name=""
          id=""
          placeholder="search here..."
          className="bg-black w-full h-12 rounded-lg text-white px-10 py-3 outline-none"
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
      </div>

      <div className="flex items-center space-x-4">
        {user ? (
          <div className="flex items-center space-x-4">
            {user?.role === "recruiter" && (
              <Button
                variant="destructive"
                className="rounded-full hidden md:block"
              >
                <PenBox size={20} className="mr-2" />
                Post a Job
              </Button>
            )}
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-64">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-lg">Samir kc </h4>
                    <p className="text-sm text-muted-foreground">
                      Lorem ipsum dolor sit amet.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="blue" className="text-md w-full">
                    <User2 className="mr-2" />
                    <Link to="/profile">View Profile</Link>
                  </Button>
                  <Button variant="destructive" className="text-md w-full">
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
