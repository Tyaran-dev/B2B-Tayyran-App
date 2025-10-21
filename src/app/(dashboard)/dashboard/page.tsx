import React from "react";
import { StatsCards } from "@/components/pages/dashboard/StatsCards";
import { BookingOverTheMonth } from "@/components/pages/dashboard/tables/BookingOverTheMonth";
import PurposeOfTravelChart from "@/components/pages/dashboard/charts/PurposeOfTravelChart";
import { TripTypeChart } from "@/components/pages/dashboard/charts/TripType";
import { MostUsedAirlineChart } from "@/components/pages/dashboard/charts/MostUsedAirlineChart";
import { BookingByClassChart } from "@/components/pages/dashboard/charts/BookingByClassChart";
import { BookingByDay } from "@/components/pages/dashboard/tables/BookingByDay";

const page = () => {
  return (
    <div className="">
      {/* status card */}
      <StatsCards />

      {/* Booking Over The Month & Purpose of Tavel */}
      <div className=" lg:grid lg:grid-cols-2 lg:gap-6 ">
        <div className="my-4 bg-white rounded-xl shadow-lg p-2">
          <BookingOverTheMonth />
        </div>
        <div className="my-4 bg-white rounded-xl shadow-lg p-2">
          <PurposeOfTravelChart />
        </div>
      </div>

      {/* trips charts */}
      <div className="lg:grid lg:grid-cols-3 lg:gap-6">
        <div className="my-4 bg-white rounded-xl shadow-lg p-2">
          <TripTypeChart />
        </div>
        <div className="my-4 bg-white rounded-xl shadow-lg p-2">
          <MostUsedAirlineChart />
        </div>
        <div className="my-4 bg-white rounded-xl shadow-lg p-2">
          <BookingByClassChart />
        </div>
      </div>

      {/* booking by day */}
      <div className="hidden lg:block"> 
        <BookingByDay />
      </div>
    </div>
  );
};

export default page;
