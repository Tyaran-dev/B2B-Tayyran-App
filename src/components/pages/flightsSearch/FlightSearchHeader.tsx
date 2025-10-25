"use client";

import { ArrowLeftRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FlightSearchHeaderProps {
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  departureDate: string;
  seatClass: string;
}

export function FlightSearchHeader({
  from,
  fromCode,
  to,
  toCode,
  departureDate,
  seatClass,
}: FlightSearchHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 p-4 mb-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-6 flex-1">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 mb-1">From</span>
            <span className="font-semibold text-sm">{`${from} (${fromCode})`}</span>
          </div>

          <div className="p-2 bg-gray-50 rounded-full">
            <ArrowLeftRight className="w-4 h-4 text-gray-600" />
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-gray-500 mb-1">To</span>
            <span className="font-semibold text-sm">{`${to} (${toCode})`}</span>
          </div>

          <div className="w-px h-8 bg-gray-200"></div>

          <div className="flex flex-col">
            <span className="text-xs text-gray-500 mb-1">Departure Date</span>
            <span className="font-semibold text-sm">{departureDate}</span>
          </div>

          <div className="w-px h-8 bg-gray-200"></div>

          <div className="flex flex-col">
            <span className="text-xs text-gray-500 mb-1">Seat Class</span>
            <span className="font-semibold text-sm">{seatClass}</span>
          </div>
        </div>

        <Button className="bg-blue-900 hover:bg-blue-800 text-white">
          <Search className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
