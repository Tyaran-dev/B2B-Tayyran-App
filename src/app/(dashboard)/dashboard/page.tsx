import React from "react";
import { StatsCards } from "@/components/pages/dashboard/StatsCards";
import { BookingOverTheMonth } from "@/components/pages/dashboard/BookingOverTheMonth";
import PurposeOfTravelChart from "@/components/pages/dashboard/PurposeOfTravelChart";
const page = () => {
  return (
    <div className="">
      <StatsCards />
      <div className=" lg:grid lg:grid-cols-2 gap-8 my-8">
        <div className="bg-red-600">
          <BookingOverTheMonth />
        </div>
        <div className="bg-blue-700">
          <PurposeOfTravelChart />
        </div>
      </div>
    </div>
  );
};

export default page;
