"use client";
import React, { useState } from "react";
import RadioGroupComponent from "./RadioGroup";
import FlightInputs from "./TextInput";
import FlightDatePicker from "./FlightDatePicker";
import { PassengerSelector } from "./Passengers";
import FlightClasses from "./FlightClasses";
import PurposeofTravel from "./PurposeofTravel";
import SearchFormButtons from "../../SearchFormButtons";

// Define types for form data
interface FlightSearchData {
  flightType: string;
  from: string;
  to: string;
  departureDate: Date | undefined;
  returnDate: Date | undefined;
  travelClass: string;
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  purpose: string;
}

// Define types for form data
export interface Passengers {
  adults: number;
  children: number;
  infants: number;
}
const FlightsSearchForm = () => {
  // Main state object to collect all form data
  const [searchData, setSearchData] = useState<FlightSearchData>({
    flightType: "oneway",
    from: "",
    to: "",
    departureDate: undefined,
    returnDate: undefined,
    travelClass: "Economy",
    passengers: {
      adults: 1,
      children: 0,
      infants: 0
    },
    purpose: "Tourism"
  });

  console.log(searchData, "searchData")

  // Individual state handlers for components that need them
  const [flightType, setFlightType] = useState("oneway");
  const [departure, setDeparture] = React.useState<Date | undefined>();
  const [returnDate, setReturnDate] = React.useState<Date | undefined>();
  const [travelClass, setTravelClass] = useState("Economy");
  const [purposeofTravelProps, setPurposeofTravelProps] = useState("Tourism");

  // Update main search data when individual states change
  React.useEffect(() => {
    setSearchData(prev => ({
      ...prev,
      flightType: flightType,
      departureDate: departure,
      returnDate: returnDate,
      travelClass: travelClass,
      purpose: purposeofTravelProps
    }));
  }, [flightType, departure, returnDate, travelClass, purposeofTravelProps]);

  // Handler for flight inputs (from/to)
  const handleFlightInputsChange = (from: string, to: string) => {
    setSearchData(prev => ({
      ...prev,
      from,
      to
    }));
  };

  // Handler for passenger changes
  const handlePassengerChange = (passengers: Passengers) => {
    setSearchData(prev => ({
      ...prev,
      passengers
    }));
  };

  // Handler for form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Search Data:", searchData);
    // Here you can use the searchData for API calls or navigation
    // For example: router.push(`/flights/results?data=${encodeURIComponent(JSON.stringify(searchData))}`);
  };

  return (
    <div className="mt-8 rounded-lg">
      <RadioGroupComponent
        flightType={flightType}
        setFlightType={setFlightType}
      />
      <form onSubmit={handleSearch} className="my-4">
        <FlightInputs
          onFlightInputsChange={handleFlightInputsChange}
        />
        <FlightDatePicker
          departure={departure}
          setDeparture={setDeparture}
          returnDate={returnDate}
          setReturnDate={setReturnDate}
          flightType={flightType}
        />
        <FlightClasses
          travelClass={travelClass}
          setTravelClass={setTravelClass}
        />
        <PassengerSelector
          onPassengerChange={handlePassengerChange}
          initialPassengers={searchData.passengers}
        />
        <PurposeofTravel
          purposeofTravelProps={purposeofTravelProps}
          setPurposeofTravelProps={setPurposeofTravelProps}
        />

        {/* search buttons */}
        {/* <div className="mt-6">
          <SearchFormButtons 
            searchData={searchData}
            onSearch={() => console.log("Search initiated with:", searchData)}
          />
        </div> */}
      </form>
    </div>
  );
};

export default FlightsSearchForm;