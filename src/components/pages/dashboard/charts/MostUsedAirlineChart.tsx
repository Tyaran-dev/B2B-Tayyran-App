"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export function MostUsedAirlineChart() {
  const data = {
    labels: [
      "SkyHorizon Airlines",
      "AeroSwift Airways",
      "CloudBreeze Aviation",
      "NovaWings Airlines",
    ],
    datasets: [
      {
        data: [25, 15, 35, 25],
        backgroundColor: ["#FF8C8C", "#9B8CFF", "#00703C", "#1E1B4B"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          color: "#374151",
          font: { size: 14 },
          usePointStyle: true,
          pointStyle: "circle",
          padding: 20,
          generateLabels(chart) {
            const { data } = chart;
            return data.labels.map((label, i) => ({
              text: `${label}  ${data.datasets[0].data[i]}%`,
              fillStyle: data.datasets[0].backgroundColor[i],
            }));
          },
        },
      },
    },
  };

  return (
    <div className="bg-white  p-6 w-full ">
      <h2 className="text-lg font-semibold mb-4">Most used Airline</h2>
      <div className="md:h-[390px]">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}
