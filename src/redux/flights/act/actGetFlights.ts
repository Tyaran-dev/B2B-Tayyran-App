import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import axiosErrorHandler from "@/lib/utils/axiosErrorHandler";

// Define your Redux state interface
interface Destination {
    id: string;
    from: string;
    to: string;
    date: string;
}

interface Passengers {
    adults: number;
    children: number;
    infants: number;
}

interface FlightSearchData {
    flightType: "oneway" | "roundtrip" | "multicity";
    from: string;
    to: string;
    departureDate: Date;
    returnDate?: Date;
    destinations: Destination[];
    passengers: Passengers;
    travelClass: string;
    purpose?: string;
    page?: string;
    pageSize?: string;
}

// API response structure
interface FlightData { }
interface Carriers {
    [key: string]: string;
}
interface Meta {
    count: number;
}
interface FlightApiResponse {
    data: FlightData[];
    dictionaries: { carriers: Carriers };
    meta: Meta;
}
interface FlightsResult {
    flights: FlightData[];
    carriers: Carriers;
    pagination: {
        currentPage: number;
        pageSize: number;
        totalResults: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
}

const actGetFlights = createAsyncThunk<
    FlightsResult,
    FlightSearchData,
    { rejectValue: string }
>("flights/actGetFlights", async (flightSearchData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    const page = flightSearchData.page || "1";
    const pageSize = flightSearchData.pageSize || "30";

    try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        // 🧠 Build destinations depending on flight type
        let destinations: Destination[] = [];

        if (flightSearchData.flightType === "oneway") {
            destinations = [
                {
                    id: "1",
                    from: flightSearchData.from,
                    to: flightSearchData.to,
                    date: new Date(flightSearchData.departureDate)
                        .toISOString()
                        .split("T")[0],
                },
            ];
        } else if (flightSearchData.flightType === "roundtrip") {
            destinations = [
                {
                    id: "1",
                    from: flightSearchData.from,
                    to: flightSearchData.to,
                    date: new Date(flightSearchData.departureDate)
                        .toISOString()
                        .split("T")[0],
                },
                {
                    id: "2",
                    from: flightSearchData.to,
                    to: flightSearchData.from,
                    date: new Date(flightSearchData.returnDate!)
                        .toISOString()
                        .split("T")[0],
                },
            ];
        } else if (flightSearchData.flightType === "multicity") {
            // Already has full destinations array in Redux
            destinations = flightSearchData.destinations.map((d, i) => ({
                id: String(i + 1),
                from: d.from,
                to: d.to,
                date: new Date(d.date).toISOString().split("T")[0],
            }));
        }

        // 🧱 Build final payload
        const payload = {
            destinations,
            adults: flightSearchData.passengers.adults,
            children: flightSearchData.passengers.children,
            infants: flightSearchData.passengers.infants,
            cabinClass: flightSearchData.travelClass,
            flightType: flightSearchData.flightType,
            directFlight: false,
            calendarSearch: false,
        };

        // 🌐 API request
        const response: AxiosResponse<FlightApiResponse> = await axios.post(
            `${apiUrl}/flights/flight-search`,
            payload
        );

        // 🧮 Pagination meta (customize based on API)
        return {
            flights: response.data.data,
            carriers: response.data.dictionaries?.carriers || {},
            pagination: {
                currentPage: Number(page),
                pageSize: Number(pageSize),
                totalResults: response.data.meta?.count || 0,
                totalPages: Math.ceil(
                    (response.data.meta?.count || 0) / Number(pageSize)
                ),
                hasNextPage:
                    Number(page) * Number(pageSize) < (response.data.meta?.count || 0),
                hasPreviousPage: Number(page) > 1,
            },
        };
    } catch (error: any) {
        console.error("Error fetching flights:", error);
        return rejectWithValue(axiosErrorHandler(error));
    }
});

export default actGetFlights;
