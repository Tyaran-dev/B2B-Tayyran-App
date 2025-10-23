"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAirports } from "@/hooks/GetAirports";
import { useEffect, useState } from "react";

interface FlightInputsProps {
  onFlightInputsChange: (from: string, to: string) => void;
}

export default function FlightInputs({ onFlightInputsChange }: FlightInputsProps) {
  // State for both input fields
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const [fromOpen, setFromOpen] = useState(false)
  const [toOpen, setToOpen] = useState(false)

  // Use the hook for both
  const { airPorts: fromAirports, loading: fromLoading } = useAirports(fromQuery);
  const { airPorts: toAirports, loading: toLoading } = useAirports(toQuery);

  // Notify parent when inputs change
  useEffect(() => {
    onFlightInputsChange(fromQuery, toQuery);
  }, [fromQuery, toQuery]);


  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-3">
      {/* From Field */}
      <div className="relative my-4 flex flex-col border rounded-lg px-3 py-2">
        <Label className="text-sm font-medium text-[#1a0e72]">From</Label>
        <Input
          placeholder="City or Airport"
          onFocus={() => setFromOpen(true)}
          onBlur={() => setTimeout(() => setFromOpen(false), 200)} // Delay to allow click event
          value={fromQuery}
          onChange={(e) => setFromQuery(e.target.value)}
          className="border-0 shadow-none p-0 focus-visible:ring-0 text-gray-700 placeholder:text-gray-400"
        />
        {/* Suggestion list */}
        {fromOpen && (
          <ul className="absolute top-full left-0 right-0 bg-white border rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg z-10 custom-scrollbar">            {fromAirports.map((airport: any) => (
            <li
              key={airport.code}
              onClick={() => setFromQuery(airport.name)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              <p className="text-xs">


                {airport.text}
              </p>
            </li>
          ))}
          </ul>
        )}
        {fromLoading && <p className="text-xs text-gray-400 mt-1">Loading...</p>}
      </div>

      {/* To Field */}
      <div className="relative my-4 flex flex-col border rounded-lg px-3 py-2">
        <Label className="text-sm font-medium text-[#1a0e72]">To</Label>
        <Input
          placeholder="City or Airport"
          value={toQuery}
          onFocus={() => setToOpen(true)}
          onBlur={() => setTimeout(() => setToOpen(false), 200)} // Delay to allow click event
          onChange={(e) => setToQuery(e.target.value)}
          className="border-0 shadow-none p-0 focus-visible:ring-0 text-gray-700 placeholder:text-gray-400"
        />
        {/* Suggestion list */}
        {toOpen && (
          <ul className="absolute top-full left-0 right-0 bg-white border rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg z-10 custom-scrollbar">            {toAirports.map((airport: any) => (
            <li
              key={airport.code}
              onClick={() => setToQuery(airport.name)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              <p className="text-xs ">
                {airport.text}
              </p>
            </li>
          ))}
          </ul>
        )}
        {toLoading && <p className="text-xs text-gray-400 mt-1">Loading...</p>}
      </div>
    </div>
  );
}