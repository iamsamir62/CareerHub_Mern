import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { PenBox } from "lucide-react";
import LoginSignup from "../pages/LoginSignup";

const Header = () => {
  const [isloggedin, setIsLoggedIn] = useState(true);
  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link>
          <img src="/logo-white.png" className="h-20" />
        </Link>
        <div>
          <Link to="/auth">
            <Button variant="outline">
              {isloggedin ? "Login" : "profile"}
            </Button>
          </Link>
          {/* <Button variant="destructive" className="rounded-full">
            <PenBox size={20} className="mr-2" />
            Post a Job
          </Button> */}
        </div>
      </nav>
    </>
  );
};

export default Header;
