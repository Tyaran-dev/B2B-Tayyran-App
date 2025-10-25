"use client";

import React, { useEffect } from "react";
import ProgressBar from "@/components/feedback/ProgressBar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import actGetFlights from "@/redux/flights/act/actGetFlights";
import { FlightList } from "@/components/pages/flightsSearch/FlightList";
const FlightSearchPage = () => {
    const dispatch = useAppDispatch();

    // 🔹 Select data from Redux
    const flightData = useAppSelector((state) => state.flightData.flightSearchParamsData);
    const { flights, loading, error } = useAppSelector((state) => state.flightData);

    console.log(flights, "flights")

    // 🔹 Fetch flights once when flightData is available
    useEffect(() => {
        if (!flightData) return;

        dispatch(actGetFlights(flightData));
    }, [flightData, dispatch]);

    return (
        <div className="p-4">
            <ProgressBar />
            <h1 className="text-xl font-semibold mt-4">Flight Search</h1>

            {/* 🔸 Loading State */}
            {loading && <p className="mt-3 text-gray-500">Searching for flights...</p>}

            {/* 🔸 Error State */}
            {error && <p className="mt-3 text-red-600">Error: {error}</p>}

            {/* 🔸 Success State */}
            {!loading && !error && flights.length > 0 && (
                <div className="mt-5 space-y-3">
                    {flights.map((flight: any, index: number) => (
                        <div
                            key={index}
                            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
                        >
                            <FlightList flights={flights} searchParams={flightData} />
                        </div>
                    ))}
                </div>
            )}

            {/* 🔸 Empty Results */}
            {!loading && !error && flights.length === 0 && (
                <p className="mt-4 text-gray-600">No flights found.</p>
            )}
        </div>
    );
};

export default FlightSearchPage;
