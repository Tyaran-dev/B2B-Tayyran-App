export interface Flight {
    origin: string;
    destination: string;
    departureDate: string;
    returnDate?: string;
    travelers: number;
    page?: string;
    pageSize?: string;
    class?: string;
}

export interface FlightSegment {
    id: string | null;
    origin: string | null;
    destination: string | null;
    date: Date | null;
}


export interface FlightFormData {
    origin: string;
    destination: string;
    departure: Date | null;
    returnDate: Date | null;
    travelers: { adults: number; children: number; infants: number; };
    flightClass: string;
    flightType: string;
    segments?: FlightSegment[];
}

export type TripType = 'oneway' | 'roundtrip' | 'multiCities';


export interface FlightDataState {
    flights: Flight[]; // This is where the flight data will be stored
    slectedFlight: Flight[] | null;
    searchParamsData: FlightFormData | null,
    tripType: string;
    loading: 'pending' | 'succeeded' | 'failed' | null;
    error: string | null;
    presentageCommission: number; // 🔹 add commission here
    presentageVat: number

}