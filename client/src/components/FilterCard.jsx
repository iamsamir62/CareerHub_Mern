import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import Search from "./Search";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { Button } from "./ui/button";

const fitlerData = [
  {
    fitlerType: "Location",
    array: ["Butwal", "Kathmandu", "Pokhara", "Pyuthan", "Dang"],
  },
  {
    fitlerType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    fitlerType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const handleValueChange = (value) => {
    setSelectedValue(value);
  };

  const handleClearFilters = () => {
    setSelectedValue("");
    dispatch(setSearchedQuery(""));
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div className="w-full h-full bg-black p-3 rounded-md">
      <h1 className="font-bold text-lg text-white">Filter Jobs</h1>
      <Search />
      <hr className="mt-3 border-t-2 border-white" />

      <div className="flex justify-center mt-3">
        <Button
          className="w-full font-bold text-xl"
          onClick={handleClearFilters}
        >
          All jobs
        </Button>
      </div>

      {fitlerData.map((data, index) => (
        <div key={index} className="mb-4">
          <h2 className="font-bold text-lg text-white">{data.fitlerType}</h2>
          <RadioGroup value={selectedValue} onValueChange={handleValueChange}>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div key={itemId} className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId} className="text-white">
                    {item}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterCard;
