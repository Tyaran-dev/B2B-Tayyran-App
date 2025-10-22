import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import FlightsSearchForm from "./forms/Flights/FlightsSearchForm";
import HotelsSearchForm from "./forms/Flights/HotelsSearchForm";
import { PiAirplaneTakeoffLight } from "react-icons/pi";
import { IoBedOutline } from "react-icons/io5";

const SearchTabs = () => {
  return (
    <Tabs defaultValue="flights" className="">
      {/* Tabs triggers */}
      <TabsList className="w-full grid grid-cols-4 md:grid-cols-10 gap-4 bg-white rounded-none ">
        <TabsTrigger
          value="flights"
          className="col-span-2 rounded-none border-none shadow-none bg-transparent  text-gray-700  data-[state=active]:border-none data-[state=active]:text-primary data-[state=active]:font-bold data-[state=active]:bg-transparent focus-visible:ring-0 focus-visible:outline-none transition-all"
        >
          <PiAirplaneTakeoffLight className="block !w-8 !h-8 m-2" />
          Flights
        </TabsTrigger>

        <TabsTrigger
          value="hotels"
          className=" col-span-2 rounded-none border-none shadow-none bg-transparent  text-gray-700   data-[state=active]:text-primary data-[state=active]:font-bold data-[state=active]:bg-transparent focus-visible:ring-0 focus-visible:outline-none transition-all"
        >
          <IoBedOutline className="block !w-8 !h-8 m-2" />
          Hotels
        </TabsTrigger>
      </TabsList>

      {/* Flights tab */}
      <TabsContent className="" value="flights">
        <FlightsSearchForm />
      </TabsContent>

      <TabsContent className="" value="hotels">
        <HotelsSearchForm />
      </TabsContent>
    </Tabs>
  );
};

export default SearchTabs;
