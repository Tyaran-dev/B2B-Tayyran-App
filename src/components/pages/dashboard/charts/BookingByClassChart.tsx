"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export function BookingByClassChart() {
  const data = {
    labels: [
      "Economy Class",
      "Premium Economy",
      "Business Class",
      "First Class",
    ],
    datasets: [
      {
        label: "Bookings",
        data: [100, 70, 30, 20],
        backgroundColor: "#00703C", // green tone
        borderRadius: 6,
        barThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "#E5E7EB" }, ticks: { stepSize: 20 } },
    },
  };

  return (
    <div className="bg-white p-6 w-full  md:h-[490px]">
      <h2 className="text-lg font-semibold mb-4">Booking by Class</h2>
      <Bar data={data} options={options} />
    </div>
  );
}
