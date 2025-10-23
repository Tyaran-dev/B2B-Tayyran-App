import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    Flight,
    FlightSegment,
    FlightFormData,
    TripType,
    FlightDataState
} from "@/types/FlightTypes";


const initialState: FlightDataState = {
    flights: [],
    slectedFlight: null,
    searchParamsData: null,
    tripType: 'oneway',
    loading: null,
    error: null,
    presentageCommission: 0, // default
    presentageVat: 0
};


export const flightDataSlice = createSlice({
    name: "flights",
    initialState,
    reducers: {

    }
})

export default flightDataSlice.reducer;

