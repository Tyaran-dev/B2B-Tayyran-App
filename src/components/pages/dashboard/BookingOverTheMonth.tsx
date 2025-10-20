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

export const BookingOverTheMonth = () => {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">Invoice</TableHead>
          <TableHead className="">Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-center">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell >INV001</TableCell>
          <TableCell className="">Paid</TableCell>
          <TableCell>
            <Slider
              defaultValue={[20, 80]}
              min={0}
              max={100}
              step={1}
              className="[&_[role=slider]]:bg-secondry [&_[role=slider]]:border-secondry     [&_[data-orientation=horizontal]_[role=range]]:bg-red-600-600
"
            />
          </TableCell>
          <TableCell className="text-center">$250.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default BookingOverTheMonth;
