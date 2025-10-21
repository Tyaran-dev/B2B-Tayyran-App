import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Slider } from "@/components/ui/slider";
import { MonthTableData } from "@/data";

export const BookingOverTheMonth = () => {
  return (
    <Table className="">
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="min-w-[90px] md:min-w-[150px]">
            Progress
          </TableHead>
          <TableHead className="text-center">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {MonthTableData.map((item) => (
          <TableRow key={item.id} className="hover:bg-muted/50">
            <TableCell className="py-4 px-6">{item.id}</TableCell>
            <TableCell className="py-4 px-6">{item.status}</TableCell>
            <TableCell className="py-4 px-6 min-w-[90px] md:min-w-[150px] w-full">
              <Slider
                defaultValue={item.value}
                min={0}
                max={100}
                step={1}
                className="
                  w-full
                  [&_[role=slider]]:bg-secondry 
                  [&_[role=slider]]:border-secondry 
                  [&_[data-orientation=horizontal]_[role=range]]:bg-red-600
                "
              />
            </TableCell>
            <TableCell className="py-4 px-6 text-center">
              ${item.amount.toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BookingOverTheMonth;
