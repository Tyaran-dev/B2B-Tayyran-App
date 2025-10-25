"use client";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch } from "@/redux/hooks";
import { setFlightSearchParamsData } from "@/redux/flights/flightSlice";
import {
  FlightSearchData,
  Passengers,
  DestinationSegment,
} from "@/types/FlightTypes";
import RadioGroupComponent from "./RadioGroup";
import FlightInputs from "./TextInput";
import FlightDatePicker from "./FlightDatePicker";
import { PassengerSelector } from "./Passengers";
import FlightClasses from "./FlightClasses";
import PurposeofTravel from "./PurposeofTravel";
import SearchFormButtons from "../../SearchFormButtons";

const FlightsSearchForm = () => {
  const dispatch = useAppDispatch();

  const [flightType, setFlightType] = useState<
    "oneway" | "roundtrip" | "multicity"
  >("oneway");
  const [departure, setDeparture] = useState<Date | undefined>();
  const [returnDate, setReturnDate] = useState<Date | undefined>();
  const [travelClass, setTravelClass] = useState("Economy");
  const [purposeofTravelProps, setPurposeofTravelProps] = useState("Tourism");
  const [passengers, setPassengers] = useState<Passengers>({
    adults: 1,
    children: 0,
    infants: 0,
  });

  // ✅ Multi-city segments (use UUIDs internally)
  const [segments, setSegments] = useState<DestinationSegment[]>([
    { id: uuidv4(), from: "", to: "", date: undefined },
  ]);

  // ✅ Helper: build destinations for oneway, roundtrip, multicity
  const buildDestinations = (): DestinationSegment[] => {
    const formatDate = (date: Date | string | undefined) =>
      date ? new Date(date).toISOString().split("T")[0] : "";

    if (flightType === "oneway") {
      return [
        {
          id: "1",
          from: segments[0]?.from || "",
          to: segments[0]?.to || "",
          date: formatDate(segments[0]?.date || departure),
        },
      ];
    }

    if (flightType === "roundtrip") {
      return [
        {
          id: "1",
          from: segments[0]?.from || "",
          to: segments[0]?.to || "",
          date: formatDate(segments[0]?.date || departure),
        },
        {
          id: "2",
          from: segments[0]?.to || "",
          to: segments[0]?.from || "",
          date: formatDate(returnDate),
        },
      ];
    }

    // Multicity
    return segments.map((seg, i) => ({
      id: (i + 1).toString(),
      from: seg.from,
      to: seg.to,
      date: formatDate(seg.date),
    }));
  };

  // ✅ Keep search data synced
  const [searchData, setSearchData] = useState<FlightSearchData>({
    flightType,
    from: "",
    to: "",
    departureDate: undefined,
    returnDate: undefined,
    travelClass,
    passengers,
    purpose: purposeofTravelProps,
    destinations: [],
  });

  useEffect(() => {
    setSearchData({
      flightType,
      from: segments[0]?.from || "",
      to: segments[0]?.to || "",
      departureDate: segments[0]?.date || departure,
      returnDate: flightType === "roundtrip" ? returnDate : undefined,
      travelClass,
      passengers,
      purpose: purposeofTravelProps,
      destinations: buildDestinations(),
    });
  }, [
    flightType,
    segments,
    departure,
    returnDate,
    travelClass,
    passengers,
    purposeofTravelProps,
  ]);

  // ✅ Handlers
  const handleFlightInputsChange = (from: string, to: string) => {
    setSegments((prev) => {
      const updated = [...prev];
      updated[0] = { ...updated[0], from, to };
      return updated;
    });
  };

  const handlePassengerChange = (p: Passengers) => setPassengers(p);

  const addSegment = () => {
    setSegments((prev) => [
      ...prev,
      { id: uuidv4(), from: "", to: "", date: undefined },
    ]);
  };

  const removeSegment = (id: string) => {
    setSegments((prev) => {
      if (prev.length <= 1) return prev; // prevent removing last
      return prev.filter((seg) => seg.id !== id);
    });
  };

  const handleSegmentChange = (
    id: string,
    field: keyof DestinationSegment,
    value: any
  ) => {
    setSegments((prev) =>
      prev.map((seg) => (seg.id === id ? { ...seg, [field]: value } : seg))
    );
  };

  // ✅ Dispatch formatted data to Redux
  const handleNextClick = () => {
    const formattedDestinations = buildDestinations();
    dispatch(
      setFlightSearchParamsData({
        ...searchData,
        destinations: formattedDestinations,
      })
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search Data:", searchData);
  };

  return (
    <div className="mt-8 rounded-lg">
      <RadioGroupComponent flightType={flightType} setFlightType={setFlightType} />

      <form onSubmit={handleSearch} className="my-4 space-y-4">
        {/* ONEWAY / ROUNDTRIP */}
        {flightType !== "multicity" && (
          <>
            <FlightInputs onFlightInputsChange={handleFlightInputsChange} />
            <FlightDatePicker
              departure={departure}
              setDeparture={setDeparture}
              returnDate={returnDate}
              setReturnDate={setReturnDate}
              flightType={flightType}
            />
          </>
        )}

        {/* MULTICITY */}
        {flightType === "multicity" && (
          <div className="space-y-3">
            {segments.map((seg, idx) => (
              <div key={seg.id} className="border p-3 rounded-lg bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-sm">Flight {idx + 1}</h3>
                  {segments.length > 1 && (
                    <button
                      type="button"
                      className="text-red-500 text-sm cursor-pointer"
                      onClick={() => removeSegment(seg.id)}
                    >
                      Remove
                    </button>
                  )}
                </div>

                <FlightInputs
                  onFlightInputsChange={(from, to) => {
                    handleSegmentChange(seg.id, "from", from);
                    handleSegmentChange(seg.id, "to", to);
                  }}
                />
                <FlightDatePicker
                  departure={seg.date}
                  setDeparture={(date) =>
                    handleSegmentChange(seg.id, "date", date)
                  }
                  flightType="oneway"
                />
              </div>
            ))}

            <button
              type="button"
              className="text-blue-600 font-medium text-sm cursor-pointer"
              onClick={addSegment}
            >
              + Add Another Flight
            </button>
          </div>
        )}

        <FlightClasses
          travelClass={travelClass}
          setTravelClass={setTravelClass}
        />
        <PassengerSelector
          onPassengerChange={handlePassengerChange}
          initialPassengers={passengers}
        />
        <PurposeofTravel
          purposeofTravelProps={purposeofTravelProps}
          setPurposeofTravelProps={setPurposeofTravelProps}
        />

        <div className="mt-6">
          <SearchFormButtons searchType="flight" onNext={handleNextClick} />
        </div>
      </form>
    </div>
  );
};

export default FlightsSearchForm;
