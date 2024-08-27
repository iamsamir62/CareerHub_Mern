import Header from "@/components/Header";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";

const AppLayout = () => {
  const location = useLocation();
  const isLoginSignupPage = location.pathname === "/auth";
  return (
    <div>
      <div className="grid-background"></div>
      <main className="min-h-screen container">
        <Header />
        <Outlet />
      </main>
      {!isLoginSignupPage && (
        <div className="p-10 text-center bg-gray-800 mt-10">
          {" "}
          Made by Samir kc❤️
        </div>
      )}
    </div>
  );
};

export default AppLayout;
