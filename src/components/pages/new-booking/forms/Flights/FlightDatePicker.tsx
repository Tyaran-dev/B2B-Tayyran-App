"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface FlightDatePickersProps {
  departure: Date | undefined;
  setDeparture: (date: Date | undefined) => void;
  returnDate: Date | undefined;
  setReturnDate: (date: Date | undefined) => void;
  flightType: string;
}

export default function FlightDatePickers({
  departure,
  setDeparture,
  returnDate,
  setReturnDate,
  flightType,
}: FlightDatePickersProps) {
  // Get today's date at midnight (no time)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="flex gap-3 w-full">
      {/* Departure Date */}
      <div className="flex flex-col w-full">
        <label className="text-sm font-medium text-[#1a0e72] mb-1">
          Departure Date
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-between rounded-lg border px-3 py-5 text-left font-normal",
                !departure && "text-gray-400"
              )}
            >
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-gray-500" />
                {departure ? (
                  format(departure, "MMMM dd, yyyy")
                ) : (
                  <span>Select date</span>
                )}
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              captionLayout="dropdown"
              selected={departure}
              onSelect={(date) => {
                setDeparture(date);
                if (returnDate && date && date > returnDate) {
                  setReturnDate(undefined);
                }
              }}
              // ❗ Disable all past dates
              disabled={(date) => date < today}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      {/* Return Date */}
      {flightType === "roundtrip" && (
        <div className="flex flex-col w-full">
          <label className="text-sm font-medium text-[#1a0e72] mb-1">
            Arrival Date
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-between rounded-lg border px-3 py-5 text-left font-normal",
                  !returnDate && "text-gray-400"
                )}
              >
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-gray-500" />
                  {returnDate ? (
                    format(returnDate, "MMMM dd, yyyy")
                  ) : (
                    <span>Select date</span>
                  )}
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                captionLayout="dropdown"
                selected={returnDate}
                onSelect={setReturnDate}
                // ❗ Disable all dates before today or before departure
                disabled={(date) =>
                  departure ? date < departure : date < today
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
}
