"use client";

import { useState } from "react";
import { FlightTicket } from "./FlightsTicket";
import { FlightSearchHeader } from "./flightSearchHeader";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FlightListProps {
  flights: any[];
  searchParams?: {
    from: string;
    fromCode: string;
    to: string;
    toCode: string;
    departureDate: string;
    seatClass: string;
  };
}

export function FlightList({ flights, searchParams }: FlightListProps) {
  const [selectedFlightId, setSelectedFlightId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("cheapest");
  const [timeFilter, setTimeFilter] = useState("earliest");

  const handleViewDetails = (flightId: string) => {
    setSelectedFlightId(flightId);
    console.log("View details for flight:", flightId);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {searchParams && (
        <FlightSearchHeader
          from={searchParams.from}
          fromCode={searchParams.fromCode}
          to={searchParams.to}
          toCode={searchParams.toCode}
          departureDate={searchParams.departureDate}
          seatClass={searchParams.seatClass}
        />
      )}

      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Choose Departure Flight</h1>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cheapest">Cheapest Flight</SelectItem>
                  <SelectItem value="fastest">Fastest Flight</SelectItem>
                  <SelectItem value="earliest">Earliest Flight</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="earliest">Earliest</SelectItem>
                <SelectItem value="morning">Morning</SelectItem>
                <SelectItem value="afternoon">Afternoon</SelectItem>
                <SelectItem value="evening">Evening</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {flights.map((flight) => (
          <FlightTicket
            key={flight.id}
            flight={flight}
            isSelected={selectedFlightId === flight.id}
            onViewDetails={() => handleViewDetails(flight.id)}
          />
        ))}
      </div>
    </div>
  );
}
