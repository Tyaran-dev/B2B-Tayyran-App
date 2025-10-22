"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { purposOfTravel } from "@/data";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function PurposeOfTravelChart() {
  const data = {
    labels: purposOfTravel,
    datasets: [
      {
        data: [20, 25, 15, 10, 20, 10],
        backgroundColor: [
          "#7AE582",
          "#FF8C8C",
          "#5ECFFF",
          "#FFB347",
          "#0D9E6F",
          "#6B4EFF",
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          color: "#374151", // text-gray-700
          font: { size: 14, family: "Inter, sans-serif" },
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
  };

  return (
    <div className=" p-6 w-full h-[550px]">
      <h2 className="text-lg font-semibold mb-4">Purpose of Travel</h2>
      <div className="h-[350px] md:h-[450px]">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}
