import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface SearchFormProps {
  searchType: string;
  onNext?: () => void; // ✅ function type, optional if you want flexibility
}


const SearchFormButtons = ({ searchType, onNext }: SearchFormProps) => {
  const handleNext = () => {
    if (onNext) onNext(); // 🔥 Fire the Redux action
  };

  return (
    <div className="flex justify-between ">
      <Button className="bg-white text-primary border border-primary hover:text-white cursor-pointer w-32 h-12 rounded-lg">Back</Button>

      <Link href={searchType === "flight" ? "/flightSearch" : "/hotelsSearch"}>
        <Button
          className="cursor-pointer w-32 h-12 rounded-lg"
          type="button"
          onClick={handleNext} // ✅ Dispatch Redux before navigation
        >
          Next
        </Button>
      </Link>
    </div>
  );
};

export default SearchFormButtons;
