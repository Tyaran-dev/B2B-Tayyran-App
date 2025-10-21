"use client";
import React, { useState } from "react";
import RadioGroupComponent from "./RadioGroup";
import FlightInputs from "./TextInput";
import FlightDatePicker from "./FlightDatePicker";

const FlightsSearchForm = () => {
  const [flightType, setFlightType] = useState("oneway");
  const [departure, setDeparture] = React.useState<Date | undefined>();
  const [returnDate, setReturnDate] = React.useState<Date | undefined>();

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
      </form>
    </div>
  );
};

export default FlightsSearchForm;
