import React from "react";
import { Button } from "@/components/ui/button";

const SearchFormButtons = () => {
  return (
    <div className="flex justify-between ">
      <Button className="bg-white text-primary border border-primary hover:text-white cursor-pointer w-32 h-12 rounded-lg">Back</Button>
      <Button className="cursor-pointer w-32 h-12 rounded-lg">Next</Button>
    </div>
  );
};

export default SearchFormButtons;
