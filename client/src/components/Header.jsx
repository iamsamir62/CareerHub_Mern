import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { PenBox } from "lucide-react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Ensure the state reflects the actual login status

  return (
    <>
      <nav className="py-4 flex justify-between items-center">
        <Link to="/">
          <img src="/logo-white.png" className="h-20" alt="Logo" />
        </Link>
        <div>
          {isLoggedIn ? (
            <div className="flex gap-5">
              <Button variant="destructive" className="rounded-full">
                <PenBox size={20} className="mr-2" />
                Post a Job
              </Button>
              <Link to="/profile">
                <Button variant="outline">Profile</Button>
              </Link>
            </div>
          ) : (
            <Link to="/auth">
              <Button variant="outline">Login</Button>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
