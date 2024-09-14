import React, { useState } from "react";
import { Input } from "./ui/input";
import { Search, SearchCheckIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const search = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };
  return (
    <div className="flex items-center border border-gray-300 rounded-md">
      <h1></h1>
      <input
        type="text"
        className="flex-1 rounded-l-md bg-transparent focus:outline-none pl-10 pr-3 py-2 w-full border-none"
        placeholder="Search here..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button
        onClick={searchJobHandler}
        className="w-12 h-full rounded-r-md bg-blue-500 text-white flex items-center justify-center"
      >
        <Search size={20} />
      </Button>
    </div>
  );
};

export default search;
