import React from "react";
// import NewBooking from "@/components/pages/new-booking/Newbooking";
import { EmploysTable } from "@/components/pages/new-booking/EmploysTable";
import SearchForm from "@/components/pages/new-booking/SearchForm";
import SearchFormButtons from "@/components/pages/new-booking/SearchFormButtons";
const page = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl">New Booking</h2>
      {/* search form  */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-4">
        {/* left section  */}
        <div className="my-4 p-4 bg-white rounded-lg">
          <SearchForm />{" "}
        </div>
        {/* right section  */}
        <div className="my-4 "><EmploysTable /> </div>
      </div>

    </div>
  );
};

export default page;
