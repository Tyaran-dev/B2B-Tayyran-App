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

export function TripTypeChart() {
  const data = {
    labels: [
      "Nov 1",
      "Nov 2",
      "Nov 3",
      "Nov 4",
      "Nov 5",
      "Nov 6",
      "Nov 7",
      "Nov 8",
      "Nov 9",
    ],
    datasets: [
      {
        label: "Two way trip",
        data: [28, 19, 27, 27, 22, 21, 10, 30, 18],
        backgroundColor: "#1E1B4B", // dark blue
        borderRadius: 6,
      },
      {
        label: "One way Trip",
        data: [60, 18, 36, 35, 58, 34, 42, 43, 33],
        backgroundColor: "#047857", // green-700
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        align: "end" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          color: "#111827", // gray-900
          font: { size: 14 },
        },
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "#E5E7EB" }, ticks: { stepSize: 20 } },
    },
  };

  return (
    <div className="bg-white  p-6 w-full md:h-[490px]">
      <h2 className="text-lg font-semibold mb-4 ">Trip Type</h2>
      <div className="">
        <Bar data={data} options={options} />{" "}
      </div>
    </div>
  );
}
