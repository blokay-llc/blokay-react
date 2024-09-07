"use client";
import { useState } from "react";
import { PropsChart } from "./props";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function ChartLine({ data, title = "", options = null }: PropsChart) {
  const [hover, setHover] = useState(false);

  const colors = options?.colors || [
    "#3b82f6",
    "#22c55e",
    "#a855f7",
    "#78716c",
    "#ea5d0c",
    "#1e78d1",
    "#50c677",
    "#c92b94",
    "#4f46e5",
    "#c026d3",
  ];

  const dataLine = {
    labels: data.labels,
    datasets: data.datasets.map((row: any, index: number) => ({
      pointBorderColor: colors[index],
      label: row.label,
      data: row.vals,
      borderColor: colors[index],
      backgroundColor: colors[index],
    })),
  };

  const optionsChart: any = {
    hoverBorderWidth: "3",
    pointRadius: [0],
    pointHoverRadius: [5],
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const optionsHover: any = {
    ...optionsChart,
    pointRadius: [3],
  };

  return (
    <Line
      options={hover ? optionsHover : optionsChart}
      data={dataLine}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    />
  );
}

export default ChartLine;
