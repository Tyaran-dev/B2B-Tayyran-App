import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    Flight,
    FlightSegment,
    FlightFormData,
    TripType,
    FlightDataState,
} from "@/types/FlightTypes";
import actGetFlights from "./act/actGetFlights";
// import actGetFlights from "./act/actGetFlights";

const initialState: FlightDataState = {
    flights: [],
    slectedFlight: null,
    flightSearchParamsData: null,
    tripType: "oneway",
    loading: null,
    error: null,
    presentageCommission: 0,
    presentageVat: 0,
};

export const flightDataSlice = createSlice({
    name: "flights",
    initialState,
    reducers: {
        setFlightSearchParamsData: (state, action: PayloadAction<any>) => {
            state.flightSearchParamsData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // 🕐 Pending — when API call starts
            .addCase(actGetFlights.pending, (state: FlightDataState) => {
                state.loading = true;
                state.error = null;
            })
            // ✅ Fulfilled — when flights are fetched successfully
            .addCase(actGetFlights.fulfilled,
                (state: FlightsState, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.flights = action.payload.flights;
                    state.error = null;
                })
            // ❌ Rejected — when there’s an error
            .addCase(actGetFlights.rejected,
                (state: FlightsState, action: PayloadAction<any | undefined>) => {
                    state.loading = false;
                    state.error = action.payload || "Failed to fetch flights";
                });
    },
});

export const { setFlightSearchParamsData } = flightDataSlice.actions;
export default flightDataSlice.reducer;
