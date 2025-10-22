"use client";
import React, { useState } from "react";
import RadioGroupComponent from "./RadioGroup";
import FlightInputs from "./TextInput";
import FlightDatePicker from "./FlightDatePicker";
import { PassengerSelector } from "./Passengers";
import FlightClasses from "./FlightClasses";
import PurposeofTravel from "./PurposeofTravel";

const FlightsSearchForm = () => {
  const [flightType, setFlightType] = useState("oneway");
  const [departure, setDeparture] = React.useState<Date | undefined>();
  const [returnDate, setReturnDate] = React.useState<Date | undefined>();
  const [travelClass, setTravelClass] = useState("Economy")
  const [purposeofTravelProps, setPurposeofTravelProps] = useState("Tourism")


  return (
    <div className="my-8 rounded-lg">
      <RadioGroupComponent
        flightType={flightType}
        setFlightType={setFlightType}
      />
      <form action="" className="my-4">
        <FlightInputs />
        <FlightDatePicker
          departure={departure}
          setDeparture={setDeparture}
          returnDate={returnDate}
          setReturnDate={setReturnDate}
          flightType={flightType}
        />
        <FlightClasses travelClass={travelClass} setTravelClass={setTravelClass} />
        <PassengerSelector />
        <PurposeofTravel purposeofTravelProps={purposeofTravelProps} setPurposeofTravelProps={setPurposeofTravelProps} />
      </form>
    </div>
  );
};

export default FlightsSearchForm;
