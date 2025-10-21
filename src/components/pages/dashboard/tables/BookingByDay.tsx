"use client";
import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DayTableData } from "@/data";

export function BookingByDay() {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Booking By Day</h2>

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {DayTableData.map((item) => (
          <div
            key={item.id}
            className="border rounded-xl p-4 space-y-4 hover:shadow-sm transition"
          >
            {/* Airline Info */}
            <div className="flex items-center gap-3">
              <Image
                src={item.logo}
                alt={item.airline}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <h3 className="font-medium">{item.airline}</h3>
                <p className="text-sm text-gray-500">{item.code}</p>
              </div>
            </div>

            {/* Route & Slider - Full width on mobile */}
            <div className="bg-green-50 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <div className="text-center">
                  <p className="font-medium text-sm">{item.depTime}</p>
                  <p className="text-xs text-gray-500">{item.from}</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-sm">{item.arrTime}</p>
                  <p className="text-xs text-gray-500">{item.to}</p>
                </div>
              </div>

              <div className="w-full px-2">
                <Slider
                  defaultValue={item.value}
                  min={10}
                  max={100}
                  step={1}
                  className="w-full [&_[role=slider]]:bg-secondry [&_[role=slider]]:border-secondry [&_[data-orientation=horizontal]_[role=range]]:bg-green-600"
                />
              </div>

              <p className="text-center text-xs text-green-700 mt-2">
                Duration: {item.duration}
              </p>
            </div>

            {/* Bottom row info */}
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-sm text-gray-700">{item.date}</p>
              </div>

              <div className="flex items-center gap-1">
                {item.avatars.map((avatar, i) => (
                  <Image
                    key={i}
                    src={avatar}
                    alt="user"
                    width={28}
                    height={28}
                    className="rounded-full border-2 border-white -ml-2"
                  />
                ))}
                <span className="text-gray-500 text-xs ml-1">{item.extra}</span>
              </div>

              <span className="text-green-700 border border-green-700 rounded-lg px-3 py-1 text-xs font-medium">
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Airline</TableHead>
              <TableHead className="min-w-[300px]">Route & Progress</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Passengers</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DayTableData.map((item) => (
              <TableRow key={item.id} className="hover:bg-muted/50">
                {/* Airline Info */}
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <Image
                      src={item.logo}
                      alt={item.airline}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <h3 className="font-medium">{item.airline}</h3>
                      <p className="text-sm text-gray-500">{item.code}</p>
                    </div>
                  </div>
                </TableCell>

                {/* Route & Slider */}
                <TableCell className="py-4 min-w-[300px]">
                  <div className="bg-green-50 rounded-lg px-4 py-3">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-center">
                        <p className="font-medium text-sm">{item.depTime}</p>
                        <p className="text-xs text-gray-500">{item.from}</p>
                      </div>

                      <div className="flex-1 mx-4">
                        <Slider
                          defaultValue={item.value}
                          min={10}
                          max={100}
                          step={1}
                          className="w-full [&_[role=slider]]:bg-secondry [&_[role=slider]]:border-secondry [&_[data-orientation=horizontal]_[role=range]]:bg-green-600"
                        />
                      </div>

                      <div className="text-center">
                        <p className="font-medium text-sm">{item.arrTime}</p>
                        <p className="text-xs text-gray-500">{item.to}</p>
                      </div>
                    </div>
                    <p className="text-center text-xs text-green-700">
                      Duration: {item.duration}
                    </p>
                  </div>
                </TableCell>

                {/* Date */}
                <TableCell className="py-4">
                  <p className="font-medium text-gray-700">{item.date}</p>
                </TableCell>

                {/* Avatars */}
                <TableCell className="py-4">
                  <div className="flex items-center justify-center gap-1">
                    {item.avatars.map((avatar, i) => (
                      <Image
                        key={i}
                        src={avatar}
                        alt="user"
                        width={32}
                        height={32}
                        className="rounded-full border-2 border-white -ml-2"
                      />
                    ))}
                    <span className="text-gray-500 text-sm ml-1">
                      {item.extra}
                    </span>
                  </div>
                </TableCell>

                {/* Status */}
                <TableCell className="py-4 text-right">
                  <span className="text-green-700 border border-green-700 rounded-lg px-4 py-1 text-sm font-medium">
                    {item.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
