"use client";
import React, { useState } from "react";

interface TripTypeTabsProps {
  flightType: string;
  setFlightType: (type: string) => void;
}

const TripTypeTabs = ({ flightType, setFlightType }: TripTypeTabsProps) => {
  const tabs = [
    { id: "oneway", label: "Oneway" },
    { id: "roundtrip", label: "Roundtrip" },
    { id: "multicity", label: "Multicity" },
  ];

  return (
    <div className="grid grid-cols-3 bg-[#f8f6ff] w-full rounded-lg">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setFlightType(tab.id)}
          className={`
            p-4 text-base font-medium rounded-lg transition-all
            ${
              flightType === tab.id
                ? "bg-[#1a0e72] text-white shadow-sm"
                : "text-[#1a0e72] bg-transparent hover:bg-[#ebe8ff]"
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TripTypeTabs;
