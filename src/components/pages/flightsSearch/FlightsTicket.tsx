"use client";

import { Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FlightSegment {
  departure: {
    iataCode: string;
    terminal?: string;
    at: string;
  };
  arrival: {
    iataCode: string;
    terminal?: string;
    at: string;
  };
  carrierCode: string;
  number: string;
  duration: string;
  numberOfStops: number;
  departure_time: string;
  arrival_time: string;
  fromName: string;
  toName: string;
  image: string;
}

interface FlightItinerary {
  duration: string;
  fromLocation: string;
  toLocation: string;
  fromName: string;
  toName: string;
  departure: {
    departure_time: string;
    arrival_time: string;
    stops: number;
    duration: string;
    flightNumber: string;
    airlineCode: string;
    airlineName: string;
  };
  segments: FlightSegment[];
  stops: any[];
}

interface FlightOffer {
  id: string;
  airline: string;
  airlineName: string;
  flightNumber: string;
  stops: number;
  price: number;
  currency: string;
  refund: boolean;
  fromLocation: string;
  toLocation: string;
  fromName: string;
  toName: string;
  itineraries_formated: FlightItinerary[];
}

interface FlightCardProps {
  flight: FlightOffer;
  isSelected?: boolean;
  onViewDetails: () => void;
}

export function FlightTicket({ flight, isSelected, onViewDetails }: FlightCardProps) {
  const itinerary = flight.itineraries_formated[0];
  const segment = itinerary.segments[0];

  const formatTime = (time: string) => {
    return time;
  };

  return (
    <Card
      className={`p-6 mb-4 transition-all hover:shadow-md ${
        isSelected ? 'border-2 border-blue-500 shadow-lg' : 'border border-gray-200'
      }`}
    >
      <div className="flex items-center justify-between gap-6">
        <div className="flex items-center gap-4 min-w-[200px]">
          <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center overflow-hidden flex-shrink-0">
            <img
              src={segment.image}
              alt={flight.airlineName}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm">{flight.airlineName}</span>
            <span className="text-xs text-gray-500">{`${flight.airline}-${flight.flightNumber}`}</span>
          </div>
        </div>

        <div className="flex items-center gap-8 flex-1">
          <div className="flex flex-col items-start">
            <span className="text-2xl font-bold">{formatTime(segment.departure_time)}</span>
            <span className="text-sm text-gray-600">{flight.fromLocation}</span>
            <span className="text-xs text-gray-500 max-w-[120px] truncate">{flight.fromName}</span>
          </div>

          <div className="flex flex-col items-center flex-1 px-4">
            <div className="flex items-center w-full relative">
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              <div className="flex-1 border-t-2 border-dashed border-gray-300 relative">
                <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 rotate-90" />
              </div>
              <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            </div>
            <span className="text-xs text-gray-500 mt-2">Duration: {itinerary.duration}</span>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-2xl font-bold">{formatTime(segment.arrival_time)}</span>
            <span className="text-sm text-gray-600">{flight.toLocation}</span>
            <span className="text-xs text-gray-500 max-w-[120px] truncate text-right">{flight.toName}</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3 min-w-[180px]">
          <div className="flex flex-col items-end">
            <span className="text-2xl font-bold text-blue-900">
              ${flight.price}
            </span>
            <span className="text-xs text-gray-500">/pax</span>
          </div>
          <Button
            onClick={onViewDetails}
            className="bg-green-700 hover:bg-green-800 text-white px-6"
          >
            View Details
          </Button>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <span className="text-xs text-gray-500">
          {flight.refund ? 'Refundable' : 'Non Refundable'}
        </span>
      </div>
    </Card>
  );
}
