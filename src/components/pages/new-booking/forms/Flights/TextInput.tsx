"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FlightInputs() {
  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-3 ">
      {/* From Field */}
      <div className="my-4 flex flex-col border rounded-lg px-3 py-2">
        <Label className="text-sm font-medium text-[#1a0e72]">From</Label>
        <Input
          placeholder="City or Airport"
          className="border-0 shadow-none p-0 focus-visible:ring-0 text-gray-700 placeholder:text-gray-400"
        />
      </div>

      {/* To Field */}
      <div className="my-4 flex flex-col border rounded-lg px-3 py-2">
        <Label className="text-sm font-medium text-[#1a0e72]">To</Label>
        <Input
          placeholder="City or Airport"
          className="border-0 shadow-none p-0 focus-visible:ring-0 text-gray-700 placeholder:text-gray-400"
        />
      </div>
    </div>
  );
}
